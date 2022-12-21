const fs = require('fs')
const path = require('path')

const profilePicturePath = path.join(__dirname, '../../public/images/profile/')

module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, notFoundHandler, successHandler, errorHandler, userAsAdminRequestDto, userAsAdminResponseDto, userAsSelfRequestDto, userAsSelfResponseDto, userAsUserRequestDto, userAsUserResponseDto, Resize, encryptPassword, passwordsMatch, logger, getCurrentUser

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { userAsAdminRequestDto = require('../../custom/dto/request/user/userAsAdmin') } catch { userAsAdminRequestDto = require('../../default/dto/request/user/userAsAdmin') }
    try { userAsAdminResponseDto = require('../../custom/dto/response/user/userAsAdmin') } catch { userAsAdminResponseDto = require('../../default/dto/response/user/userAsAdmin') }
    try { userAsSelfRequestDto = require('../../custom/dto/request/user/userAsSelf') } catch { userAsSelfRequestDto = require('../../default/dto/request/user/userAsSelf') }
    try { userAsSelfResponseDto = require('../../custom/dto/response/user/userAsSelf') } catch { userAsSelfResponseDto = require('../../default/dto/response/user/userAsSelf') }
    try { userAsUserRequestDto = require('../../custom/dto/request/user/userAsUser') } catch { userAsUserRequestDto = require('../../default/dto/request/user/userAsUser') }
    try { userAsUserResponseDto = require('../../custom/dto/response/user/userAsUser') } catch { userAsUserResponseDto = require('../../default/dto/response/user/userAsUser') }
    try { Resize = require('../../custom/utils/Resize') } catch { Resize = require('../../default/utils/Resize') }
    try { encryptPassword = require('../../custom/utils/encryptPassword') } catch { encryptPassword = require('../../default/utils/encryptPassword') }
    try { passwordsMatch = require('../../custom/utils/passwordsMatch') } catch { passwordsMatch = require('../../default/utils/passwordsMatch') }
    try { logger = require('../../custom/utils/logger') } catch { logger = require('../../default/utils/logger') }
    try { getCurrentUser = require('../../custom/utils/getCurrentUser') } catch { getCurrentUser = require('../../default/utils/getCurrentUser') }

    async function getUser(req){

        try {

            const currentUserDoc = await getCurrentUser(req)
            if(!currentUserDoc) return notFoundHandler('User')

            const currentUserDocDto = userAsSelfResponseDto(currentUserDoc)
            return successHandler(undefined, currentUserDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getUserById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            const userDoc = await UserModel
                .findOne({ _id:req.params._id })


            if(!userDoc) return notFoundHandler('User')

            if(currentUserDoc.isAdmin){

                const userDocDto = userAsAdminResponseDto(userDoc)

                return successHandler(undefined, userDocDto)

            }

            if(currentUserDoc.isUser){

                const userDocDto = userAsUserResponseDto(userDoc)

                return successHandler(undefined, userDocDto)

            }

            return errorHandler(406, 'User role not found')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getUsers(req){

        try {

            const userDocs = await UserModel
                .find()


            const currentUserDoc = await UserModel
                .findOne({
                    _id:req.user._id
                })

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.isAdmin){

                const userDocsDto = userAsAdminResponseDto(userDocs)

                return successHandler(undefined, userDocsDto)

            }

            if(currentUserDoc.isUser){

                const userDocsDto = userAsUserResponseDto(userDocs)

                return successHandler(undefined, userDocsDto)

            }

            return errorHandler(406, 'User role not found')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createUser(req){

        try {

            const currentUserDoc = await UserModel
                .findOne({ _id:req.user._id })

            if(!currentUserDoc) return notFoundHandler('User')
            if(!currentUserDoc.isAdmin) return errorHandler(403, 'Forbidden')

            const {
                username,
                email,
                newPassword,
                repeatPassword,
                currentPassword,
                roles
            } = userAsAdminRequestDto(req.body)

            const adjustedRoles = []

            if(Array.isArray(roles)){

                roles.map(role => {

                    for(let key in role){

                        if(role[key] === true){

                            adjustedRoles.push(key)

                        }

                    }

                })

            }

            const matchingCurrentPasswords = await passwordsMatch(currentPassword, currentUserDoc.passwordHash)

            if (!matchingCurrentPasswords) return errorHandler(406, 'Wrong password')

            if (newPassword !== repeatPassword) return errorHandler(406, 'Passwords don\'t match')

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const passwordHash = await encryptPassword(newPassword)

                const newUserDoc = new UserModel({
                    username,
                    email,
                    passwordHash,
                    roles:adjustedRoles
                })

                const newMutationDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'create',
                    data:{
                        username,
                        email,
                        roles:adjustedRoles
                    }
                })

                newUserDoc.mutations.push(newMutationDoc._id)

                response = await newUserDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const userDocDto = userAsAdminResponseDto(response)

            return successHandler(undefined, userDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    // async function updateUser(req){

        // try {
        //
        //     const userDoc = await UserModel
        //         .findOne({ _id:req.user._id })
        //
        //     if(!userDoc) return notFoundHandler('User')
        //
        //     const {
        //         name,
        //         email,
        //         phone,
        //         address,
        //         emails,
        //         phones,
        //         addresses,
        //         settings,
        //         newPassword,
        //         password,
        //         repeatPassword,
        //     } = userAsSelfRequestDto(req.body)
        //
        //     const matchingCurrentPasswords = await passwordsMatch(password, userDoc.passwordHash)
        //
        //     if(!matchingCurrentPasswords) return errorHandler(406, 'Wrong password')
        //
        //     let response
        //
        //     const session = await connection.startSession()
        //     await session.withTransaction(async () => {
        //
        //         if(newPassword && repeatPassword && newPassword.length > 0){
        //
        //             if(newPassword !== repeatPassword){
        //
        //                 return errorHandler(406, 'Passwords don\'t match')
        //
        //             }
        //
        //             const passwordHash = await encryptPassword(newPassword)
        //
        //             userDoc.passwordHash = passwordHash
        //
        //         }
        //
        //         if(name) userDoc.name = name
        //         if(email) userDoc.email = email
        //         if(phone) userDoc.phone = phone
        //         if(address) userDoc.address = address
        //         if(emails) userDoc.emails = emails
        //         if(phones) userDoc.phones = phones
        //         if(addresses) userDoc.addresses = addresses
        //         if(settings) userDoc.settings = settings
        //
        //         const newMutationDoc = new MutationModel({
        //             user:userDoc._id,
        //             action:'update',
        //             data:{
        //                 username:req.user._id,
        //                 email
        //             }
        //         })
        //
        //         userDoc.mutations.push(newMutationDoc._id)
        //
        //         response = await userDoc.save()
        //         await newMutationDoc.save()
        //
        //     })
        //
        //     session.endSession()
        //
        //     const userDocDto = userAsSelfResponseDto(response)
        //
        //     return successHandler(undefined, userDocDto)
        //
        // } catch (error) {
        //
        //     return errorHandler(undefined, error)
        //
        // }

    // }

    async function updateUser(req){

        try {

            const currentUserDoc = await UserModel
                .findOne({
                    _id:req.user._id
                })

            if(!currentUserDoc) return notFoundHandler('User')

            const {
                _id,
                name,
                email,
                phone,
                address,
                emails,
                phones,
                addresses,
                settings,
                password,
                roles,
            } = userAsAdminRequestDto(req.body)

            if(!currentUserDoc.isAdmin && _id !== req.user._id) return errorHandler(403, 'Forbidden')

            const adjustedRoles = []

            if(currentUserDoc.isAdmin){

                if(Array.isArray(roles)){

                    roles.map(role => {

                        for(let key in role){

                            if(role[key] === true){

                                adjustedRoles.push(key)

                            }

                        }

                    })

                }

            }

            const matchingCurrentPasswords = await passwordsMatch(password, currentUserDoc.passwordHash)

            if (!matchingCurrentPasswords) return errorHandler(406, 'Wrong password')

            const userDoc = await UserModel
                .findOne({ _id:_id })


            if (!userDoc) return notFoundHandler('User')

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(name) userDoc.name = name
                if(email) userDoc.email = email
                if(roles && currentUserDoc.isAdmin) userDoc.roles = adjustedRoles
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
                        roles:adjustedRoles,
                        phone,
                        address,
                        emails,
                        phones,
                        addresses,
                        settings,
                    }
                })

                userDoc.mutations.push(newMutationDoc._id)

                response = await userDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const userDocDto = userAsAdminResponseDto(response)

            return successHandler(undefined, userDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function deleteUserById(req){

        try {

            const currentUser = await UserModel
                .findOne({ _id:req.user._id })

            if (!currentUser) return notFoundHandler('User')
            if (!currentUser.isAdmin) return errorHandler(403, 'Forbidden')

            const result = UserModel
                .findOneAndDelete({ _id:req.params._id })

            return successHandler(undefined, 'User successfully deleted')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function uploadProfilePicture(req){

        try {

            const userDoc = await UserModel
                .findOne({ _id:req.user._id })

            if(!userDoc) return notFoundHandler('User')

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

            // error if this user is not found
            if(!currentUser) return notFoundHandler('User')

            // error if the suer is not an admin
            if(!currentUser.isAdmin) return errorHandler(403, 'Forbidden')

            const userDoc = await UserModel
                .findOne({ _id:req.params._id })

            if(!userDoc) return notFoundHandler('User')

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
        // updateUserById,
        deleteUserById,
        uploadProfilePicture,
        uploadProfilePictureById,
    }

}
