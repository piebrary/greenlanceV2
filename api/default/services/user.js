const fs = require('fs')
const path = require('path')

const profilePicturePath = path.join(__dirname, '../../public/images/profile/')

module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, notFoundHandler, successHandler, errorHandler, userRequestDto, userResponseDto, Resize, encryptPassword, passwordsMatch, logger

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { userRequestDto = require('../../custom/dto/request/user/user') } catch { userRequestDto = require('../../default/dto/request/user/user') }
    try { userResponseDto = require('../../custom/dto/response/user/user') } catch { userResponseDto = require('../../default/dto/response/user/user') }
    try { Resize = require('../../custom/utils/Resize') } catch { Resize = require('../../default/utils/Resize') }
    try { encryptPassword = require('../../custom/utils/encryptPassword') } catch { encryptPassword = require('../../default/utils/encryptPassword') }
    try { passwordsMatch = require('../../custom/utils/passwordsMatch') } catch { passwordsMatch = require('../../default/utils/passwordsMatch') }
    try { logger = require('../../custom/utils/logger') } catch { logger = require('../../default/utils/logger') }

    async function getUser(req){

        try {

            const userDoc = await UserModel
                .findOne({
                    _id:req.user._id
                })
                .exec()

            if(!userDoc){

                return notFoundHandler('User')

            }

            const userDocDto = userResponseDto(userDoc)

            return successHandler(undefined, userDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getUserById(req){

        try {

            const currentUserDoc = await UserModel
                .findOne({
                    _id:req.user._id
                })
                .exec()

            if(!currentUserDoc){

                return notFoundHandler('User')

            }

            const userDoc = await UserModel
                .findOne({
                    _id:req.params._id
                })
                .exec()

            if(!userDoc){

                return notFoundHandler('User')

            }

            const userDocDto = userResponseDto(userDoc)

            if(currentUserDoc.isAdmin){

                return successHandler(undefined, userDocDto)

            }

            return successHandler(undefined, {
                _id:userDocDto._id,
                username:userDocDto.username,
                profilePicture:userDocDto.profilePicture
            })

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getUsers(req){

        try {

            const userDocs = await UserModel
                .find()
                .exec()

            const currentUserDoc = await UserModel
                .findOne({
                    _id:req.user._id
                })
                .exec()

            if(!currentUserDoc){

                return notFoundHandler('User')

            }

            if(currentUserDoc.isAdmin){

                const userDocsDto = userDocs.map(u => userResponseDto(u))

                return successHandler(undefined, userDocsDto)

            }

            const userDocsDto = userDocs.map(u => {

                return {
                    _id:u._id,
                    username:u._id,
                    profilePicture:u.profilePicture
                }

            })

            return successHandler(undefined, userDocsDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createUser(req){

        try {

            const currentUserDoc = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            if(!currentUserDoc){

                return notFoundHandler('User')

            }

            if(!currentUserDoc.isAdmin){

                return errorHandler(403, 'Forbidden')

            }

            const {
                username,
                email,
                newPassword,
                repeatPassword,
                currentPassword,
                roles
            } = userRequestDto(req.body)

            const matchingCurrentPasswords = await passwordsMatch(currentPassword, currentUserDoc.passwordHash)

            if(!matchingCurrentPasswords){

                return errorHandler(406, 'Wrong password')

            }

            if(newPassword !== repeatPassword){

                return errorHandler(406, 'Passwords don\'t match')

            }

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const passwordHash = await encryptPassword(newPassword)

                const newUserDoc = new UserModel({
                    username,
                    email,
                    passwordHash,
                    roles
                })

                const newMutationDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'create',
                    data:{
                        username,
                        email,
                        roles
                    }
                })

                newUserDoc.mutations.push(newMutationDoc._id)

                response = await newUserDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const userDocDto = userResponseDto(response)

            return successHandler(undefined, userDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function updateUser(req){

        try {

            const userDoc = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            if(!userDoc){

                return notFoundHandler('User')

            }

            const {
                name,
                email,
                phone,
                address,
                emails,
                phones,
                addresses,
                settings,
                newPassword,
                currentPassword,
                repeatPassword,
            } = userRequestDto(req.body)

            const matchingCurrentPasswords = await passwordsMatch(currentPassword, currentUserDoc.passwordHash)

            if(!matchingCurrentPasswords){

                return errorHandler(406, 'Wrong password')

            }

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(newPassword.length > 0){

                    if(newPassword !== repeatPassword){

                        return errorHandler(406, 'Passwords don\'t match')

                    }

                    const passwordHash = await encryptPassword(newPassword)

                    userDoc.passwordHash = passwordHash

                }

                if(name) userDoc.name = name
                if(email) userDoc.email = email
                if(phone) userDoc.phone = phone
                if(address) userDoc.address = address
                if(emails) userDoc.emails = emails
                if(phones) userDoc.phones = phones
                if(addresses) userDoc.addresses = addresses
                if(settings) userDoc.settings = settings

                const newMutationDoc = new MutationModel({
                    user:userDoc._id,
                    action:'update',
                    data:{
                        username,
                        email,
                        roles
                    }
                })

                newUserDoc.mutations.push(newMutationDoc._id)

                response = await userDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const userDocDto = userResponseDto(response)

            return successHandler(undefined, userDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function updateUserById(req){

        try {

            const currentUserDoc = await UserModel
                .findOne({
                    _id:req.user._id
                })
                .exec()

            if(!currentUserDoc){

                return notFoundHandler('User')

            }

            if(!currentUserDoc.isAdmin){

                errorHandler(403, 'Forbidden')

            }

            const {
                name,
                email,
                phone,
                address,
                emails,
                phones,
                addresses,
                settings,
                currentPassword,
            } = userRequestDto(req.body)

            const matchingCurrentPasswords = await passwordsMatch(currentPassword, currentUserDoc.passwordHash)

            if(!matchingCurrentPasswords){

                return errorHandler(406, 'Wrong password')

            }

            const userDoc = await UserModel
                .findOne({ _id:req.params._id })
                .exec()

            if(!userDoc){

                return notFoundHandler('User')

            }

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(name) userDoc.name = name
                if(email) userDoc.email = email
                if(phone) userDoc.phone = phone
                if(address) userDoc.address = address
                if(emails) userDoc.emails = emails
                if(phones) userDoc.phones = phones
                if(addresses) userDoc.addresses = addresses
                if(settings) userDoc.settings = settings

                const newMutationDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'update',
                    data:{
                        username:userDoc.username,
                        email,
                        roles
                    }
                })

                userDoc.mutations.push(newMutationDoc._id)

                response = await userDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const userDocDto = userResponseDto(response)

            return successHandler(undefined, userDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function deleteUserById(req){

        try {

            const currentUser = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            if(!currentUser){

                return notFoundHandler('User')

            }

            if(!currentUser.isAdmin){

                return errorHandler(403, 'Forbidden')

            }

            const result = UserModel
                .findOneAndDelete({ _id:req.params._id })
                .exec()

            return successHandler(undefined, 'User successfully deleted')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function uploadProfilePicture(req){

        try {

            const userDoc = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            if(!userDoc){

                return notFoundHandler('User')

            }

            const fileUpload = new Resize(profilePicturePath)
            const filename = await fileUpload.save(req.file.buffer)

            // delete old profile picture
            if(userDoc.profilePicture){

                fs.unlink(profilePicturePath + userDoc.profilePicture, error => {

                    if(error) {

                        logger.error({
                            message:'New Error: fs.unlink on uploadProfilePicture()',
                            data:error
                        })

                    }

                })

            }

            userDoc.profilePicture = filename

            const result = await userDoc.save()

            return successHandler(undefined, filename)

        } catch (error) {

            return errorHandler(undefined, error)

        }


    }

    async function uploadProfilePictureById(req){

        try {

            // get user who makes the request
            const currentUser = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            // error if this user is not found
            if(!currentUser){

                return notFoundHandler('User')

            }

            // error if the suer is not an admin
            if(!currentUser.isAdmin){

                return errorHandler(403, 'Forbidden')

            }

            const userDoc = await UserModel
                .findOne({ _id:req.params._id })
                .exec()

            if(!userDoc){

                return notFoundHandler('User')

            }

            const fileUpload = new Resize(profilePicturePath)
            const filename = await fileUpload.save(req.file.buffer)

            // delete old profile picture
            if(userDoc.profilePicture){

                fs.unlink(profilePicturePath + userDoc.profilePicture, error => {

                    if(error) {

                        logger.error({
                            message:'New Error: fs.unlink on uploadProfilePicture()',
                            data:error
                        })

                    }

                })

            }

            userDoc.profilePicture = filename

            const result = await userDoc.save()

            return successHandler(undefined, filename)

        } catch (error) {

            return errorHandler(undefined, error)

        }


    }

    return {
        getUser,
        getUserById,
        getUsers,
        createUser,
        updateUser,
        updateUserById,
        deleteUserById,
        uploadProfilePicture,
        uploadProfilePictureById,
    }

}
