const bcrypt = require('bcrypt')
const crypto = require("crypto")

module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, TokenModel, encryptPassword, notFoundHandler, successHandler, errorHandler, userRequestDto, userResponseDto, mailer

    try { TokenModel = require('../../custom/models/token') } catch { TokenModel = require('../../default/models/token') }
    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { encryptPassword = require('../../custom/utils/encryptPassword') } catch { encryptPassword = require('../../default/utils/encryptPassword') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { userRequestDto = require('../../custom/dto/request/user/user') } catch { userRequestDto = require('../../default/dto/request/user/user') }
    try { userResponseDto = require('../../custom/dto/response/user/user') } catch { userResponseDto = require('../../default/dto/response/user/user') }
    try { mailer = require('../../custom/utils/mailer')() } catch { mailer = require('../../default/utils/mailer')() }



    // register function is only for self (public) registration
    // register by an admin of other user is handled in users service

    async function register(req){

        try {

            const {
                username,
                email,
                password,
                repeatPassword,
            } = userRequestDto(req.body)

            if(password !== repeatPassword){

                return errorHandler(406, 'Passwords don\'t match')

            }

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const passwordHash = await encryptPassword(password)

                const newUserDoc = new UserModel({
                    username,
                    password:passwordHash,
                    email,
                    roles:['user']
                })

                const newMutationDoc = new MutationModel({
                    user:newUserDoc._id,
                    action:'register',
                    data:{
                        username,
                        email
                    }
                })

                newUserDoc.mutation.push(newMutationDoc._id)

                response = await newUserDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const userDocDto = userResponseDto(response)

            return successHandler(undefined, userDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

        // try {
        //
        //     const {
        //         username,
        //         email,
        //         password,
        //         repeatPassword,
        //     } = userRequestDto(req.body)
        //
        //     if(password !== repeatPassword){
        //
        //         return errorHandler(406, 'Passwords don\'t match')
        //
        //     }
        //
        //     const newMutationDocument = new MutationModel()
        //     const newUserDocument = new UserModel()
        //
        //     newUserDocument.username = username
        //     newUserDocument.passwordHash = await encryptPassword(password)
        //     newUserDocument.email = email
        //     newUserDocument.roles.push('user')
        //     newUserDocument.mutations.push(newMutationDocument._id)
        //
        //     newMutationDocument.user = newUserDocument._id
        //     newMutationDocument.action = 'create'
        //     newMutationDocument.data = {
        //         username,
        //         email
        //     }
        //
        //     const result = await newUserDocument.save()
        //     await newMutationDocument.save()
        //
        //     const userDocumentDto = userResponseDto(result)
        //
        //     return successHandler(undefined, userDocumentDto)
        //
        // } catch (error) {
        //
        //     return errorHandler(undefined, error)
        //
        // }

    }

    async function passwordResetRequest(req){

        try {

            const {
                email,
            } = userRequestDto(req.body)

            const userDocument = await UserModel
                .findOne({ email })
                .exec()

            if(!userDocument){

                return notFoundHandler('User')

            }

            const token = await TokenModel
                .findOne({ userId:userDocument._id })
                .exec()

            if(token){

                await token.deleteOne()

            }

            const resetToken = crypto.randomBytes(32).toString('hex')
            const hash = await encryptPassword(resetToken)

            await new TokenModel({
                userId:userDocument._id,
                token:hash,
                createdAt: Date.now()
            }).save()

            const resetLink = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${userDocument._id}`

            mailer.sendMail({
                to: userDocument.email,
                from: `"${process.env.APP_NAME}" <${process.env.NO_REPLY_EMAIL}>`, // Make sure you don't forget the < > brackets
                subject: 'Password Reset',
                text: 'Click the link to reset your password', // Optional, but recommended
                html: `<a href=${resetLink}>Click here</a> to reset your password or copy the following code in your addressbar: ${resetLink}`, // Optional
            })

            return successHandler(undefined)

        } catch (error) {

            console.log(error)

            return errorHandler(undefined, error)

        }

    }

    async function passwordReset(req){

        try {

            const {
                id,
                token,
                newPassword
            } = req.body

            const passwordResetToken = await TokenModel
                .findOne({ userId:id })
                .exec()

            if(!passwordResetToken){

                return notFoundHandler('Token')

            }

            const isTokenValid = await bcrypt.compare(token, passwordResetToken.token)

            if(!isTokenValid){

                return errorHandler(undefined, 'Token not valid')

            }

            const hash = await encryptPassword(newPassword)

            const userDocument = await UserModel
                .findOne({ _id:id })
                .exec()

            userDocument.passwordHash = hash

            const result = await userDocument.save()

            mailer.sendMail({
                to: userDocument.email,
                from: `"${process.env.APP_NAME}" <${process.env.NO_REPLY_EMAIL}>`, // Make sure you don't forget the < > brackets
                subject: 'Password Reset Successfull',
                text: 'Password Reset Successfull', // Optional, but recommended
                html: `Password Reset Successfull.`, // Optional
            })

            await TokenModel
                .findOneAndDelete({ _id:passwordResetToken._id })
                .exec()

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    return {
        register,
        passwordResetRequest,
        passwordReset
    }

}
