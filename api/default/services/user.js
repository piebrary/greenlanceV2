const fs = require('fs')
const path = require('path')

const profilePicturePath = path.join(__dirname, '../../public/images/profile/')

module.exports = () => {

    let UserModel, notFoundHandler, successHandler, errorHandler, eventRequestDto, eventResponseDto, Resize, encryptPassword, passwordsMatch, logger

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
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

                const userDocumentDto = userResponseDto(userDocument)

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

                const userDocumentDto = userResponseDto(userDocument)

                return successHandler(undefined, userDocumentDto)

            }

            const userDocumentDto = userResponseDto(userDocument)

            return successHandler(
                undefined,
                {
                    _id, username, profilePicture
                } = userDocumentDto
            )

        } catch (error) {

            return errorHandler(undefined, error)

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

                return {
                    _id, username, profilePicture
                } = u

            })

            return successHandler(undefined, userDocumentsDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createUserPublic(req){

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

            const newUserDocument = new UserModel()
            newUserDocument.username = username
            newUserDocument.passwordHash = await encryptPassword(password)
            newUserDocument.email = email
            newUserDocument.roles.push('user')

            const result = await newUserDocument.save()
            const userDocumentDto = userResponseDto(result)

            return successHandler(undefined, userDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

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
                name,
                email,
                phone,
                address,
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
            newUserDocument.name = name
            newUserDocument.email = email
            newUserDocument.phone = phone
            newUserDocument.address = address
            newUserDocument.roles = roles

            const result = await newUserDocument.save()
            const userDocumentDto = userResponseDto(result)

            return successHandler(undefined, userDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

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
                name,
                email,
                phone,
                address,
                roles,
                settings,
                newPassword,
                currentPassword,
                repeatPassword,
            } = userRequestDto(req.body)

            // updating password or email or roles requires a current user password
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
            if(name) userDocument.name = name
            if(phone) userDocument.phone = phone
            if(address) userDocument.address = address
            if(settings) userDocument.settings = settings

            const result = await userDocument.save()
            const userDocumentDto = userResponseDto(result, true)

            return successHandler(undefined, userDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

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

            return errorHandler(undefined, error)

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

                fs.unlink(profilePicturePath + userDocument.profilePicture, error => {

                    if(error) {

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

            return errorHandler(undefined, error)

        }


    }

    return {
        getUser,
        getUsers,
        createUserPublic,
        createUser,
        updateUser,
        deleteUser,
        uploadProfilePicture,
    }

}
