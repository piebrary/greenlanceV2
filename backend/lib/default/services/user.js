const fs = require('fs')
const path = require('path')

const profilePicturePath = path.join(__dirname, '../../../public/images/profile/')

module.exports = mode => {

    let UserModel, notFoundHandler, successHandler, errorHandler, eventRequestDto, eventResponseDto, Resize, encryptPassword, passwordsMatch, logger

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../models/user') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../handlers/error') }
    try { userRequestDto = require('../../custom/dto/request/user') } catch { userRequestDto = require('../dto/request/user') }
    try { userResponseDto = require('../../custom/dto/response/user') } catch { userResponseDto = require('../dto/response/user') }
    try { Resize = require('../../custom/utils/Resize') } catch { Resize = require('../utils/Resize') }
    try { encryptPassword = require('../../custom/utils/encryptPassword') } catch { encryptPassword = require('../utils/encryptPassword') }
    try { passwordsMatch = require('../../custom/utils/passwordsMatch') } catch { passwordsMatch = require('../utils/passwordsMatch') }
    try { logger = require('../../custom/utils/logger') } catch { logger = require('../utils/logger') }

    async function getUser(req){

        try {

            const userDocument = await UserModel
                .findOne({
                    _id:req.params._id || req.user._id
                })
                .exec()

            if(!userDocument){

                return notFoundHandler('User')

            }

            if(
                req.params._id === req.user._id
                || !req.params._id
            ){

                const userDocumentDto = userResponseDto(userDocument, true)

                return successHandler(undefined, userDocumentDto)

            }

            const currentUserDocument = await UserModel
                .findOne({
                    _id:req.user._id
                })
                .exec()

            if(!currentUserDocument){

                return notFoundHandler('User')

            }

            if(currentUserDocument.isAdmin){

                const userDocumentDto = userResponseDto(userDocument, true)

                return successHandler(undefined, userDocumentDto)

            }

            const userDocumentDto = userResponseDto(userDocument)

            return successHandler(undefined, userDocumentDto)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(500, error)

            }

            if(mode === 'PROD'){

                return errorHandler(500, 'Unknown error')

            }

        }

    }

    async function getUsers(req){

        try {

            const userDocuments = await UserModel
                .find()
                .exec()

            const currentUserDocument = await UserModel
                .findOne({
                    _id:req.user._id
                })
                .exec()

            if(!currentUserDocument){

                return notFoundHandler('User')

            }

            if(currentUserDocument.isAdmin){

                const userDocumentsDto = userDocuments.map(u => {

                    return userResponseDto(u, true)

                })

                return successHandler(undefined, userDocumentsDto)

            }

            const userDocumentsDto = userDocuments.map(u => {

                return userResponseDto(u)

            })

            return successHandler(undefined, userDocumentsDto)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(500, error)

            }

            if(mode === 'PROD'){

                return errorHandler(500, 'Unknown error')

            }

        }

    }

    async function createUser(req){

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

            const {
                username,
                email,
                newPassword,
                repeatPassword,
                currentPassword,
                roles
            } = userRequestDto(req.body)

            const matchingPasswords = await passwordsMatch(currentPassword, currentUser.passwordHash)

            if(!matchingPasswords){

                return errorHandler(406, 'Wrong password')

            }

            if(newPassword !== repeatPassword){

                return errorHandler(406, 'Passwords don\'t match')

            }

            const newUserDocument = new UserModel()
            newUserDocument.username = username
            newUserDocument.passwordHash = await encryptPassword(newPassword)
            newUserDocument.email = email
            newUserDocument.roles = roles

            const result = await newUserDocument.save()
            const userDocumentDto = userResponseDto(result)

            return successHandler(undefined, userDocumentDto)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(undefined, error)

            }

            if(mode === 'PROD'){

                return errorHandler(undefined, 'Unknown error')

            }

        }

    }

    async function updateUser(req){

        try {

            const currentUser = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            if(req.params._id){

                // get user who makes the request

                // error if this user is not found
                if(!currentUser){

                    return notFoundHandler('User')

                }

                // error if the suer is not an admin
                if(!currentUser.isAdmin){

                    return errorHandler(403, 'Forbidden')

                }

            }

            const userDocument = await UserModel
                .findOne({ _id:req.params._id || req.user._id })
                .exec()

            if(!userDocument){

                return notFoundHandler('User')

            }

            const {
                firstName,
                lastName,
                email,
                roles,
                settings,
                newPassword,
                currentPassword,
                repeatPassword,
            } = userRequestDto(req.body)

            // updating password or email or roles requires a password
            if(newPassword || email || roles){

                const matchingPasswords = passwordsMatch(currentPassword, currentUser.passwordHash)

                if(!matchingPasswords){

                    return errorHandler(406, 'Wrong password')

                }

                if(newPassword !== repeatPassword){

                    return errorHandler(406, 'Passwords don\'t match')

                }

                if(newPassword) userDocument.passwordHash = await encryptPassword(newPassword)
                if(email) userDocument.email = email
                if(roles) userDocument.roles = roles

            }

            // update user
            if(firstName) userDocument.firstName = firstName
            if(lastName) userDocument.lastName = lastName
            if(settings) userDocument.settings = settings

            const result = await userDocument.save()
            const userDocumentDto = userResponseDto(result, true)

            return successHandler(undefined, userDocumentDto)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(undefined, error)

            }

            if(mode === 'PROD'){

                return errorHandler(undefined, 'Unknown error')

            }

        }

    }

    async function deleteUser(req){

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

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(undefined, error)

            }

            if(mode === 'PROD'){

                return errorHandler(undefined, 'Unknown error')

            }

        }

    }

    async function uploadProfilePicture(req){

        try {

            if(req.params._id){

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

            }

            const userDocument = await UserModel
                .findOne({ _id:req.params._id || req.user._id })
                .exec()

            if(!userDocument){

                return notFoundHandler('User')

            }

            const fileUpload = new Resize(profilePicturePath)
            const filename = await fileUpload.save(req.file.buffer)

            // delete old profile picture
            if(userDocument.profilePicture){

                fs.unlink(profilePicturePath + userDocument.profilePicture, err => {

                    if(err) {

                        logger.error({
                            message:'New Error: fs.unlink on uploadProfilePicture()',
                            data:error
                        })

                    }

                })

            }

            userDocument.profilePicture = filename

            const result = await userDocument.save()

            return successHandler(undefined, filename)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(500, error)

            }

            if(mode === 'PROD'){

                return errorHandler(500, 'Unknown error')

            }

        }


    }

    return {
        getUser,
        getUsers,
        createUser,
        updateUser,
        deleteUser,
        uploadProfilePicture,
    }

}
