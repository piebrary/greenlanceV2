const fs = require('fs')

const path = require('path')
const Resize = require('../utils/Resize')

const UserModel = require('../models/user')

const notFoundHandler = require('../handlers/notFound')
const successHandler = require('../handlers/success')
const errorHandler = require('../handlers/error')

const userResponseDto = require('../dto/response/user')
const userRequestDto = require('../dto/request/user')

const encryptPassword = require('../utils/encryptPassword')
const passwordsMatch = require('../utils/passwordsMatch')

const logger = require('../utils/logger')

const profilePicturePath = path.join(__dirname, '../../public/images/profile/')

module.exports = mode => {

    async function getMyUserData(req){

        try {

            const userDocument = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            if(!userDocument) return notFoundHandler('User')

            const userDocumentDto = userResponseDto(userDocument, req.user._id)

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

    async function getOtherUserData(req){

        try {

            const currentUser = await UserModel.findOne({ _id:req.user_id }).exec()

            if(!currentUser) return notFoundHandler()

            if(!currentUser.isAdmin && !currentUser.isSuperuser){

                return errorHandler(403, 'Forbidden')

            }

            const userDocument = await UserModel
                .findOne({ _id:req.params._id })
                .exec()

            if(!userDocument) return notFoundHandler('User')

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

            const currentUser = await UserModel.findOne({ _id:req.user._id }).exec()

            if(!currentUser) return notFoundHandler('User')

            if(!currentUser.isAdmin){

                return errorHandler(403, 'Forbidden')

            }

            const userDocuments = await UserModel
                .find()
                .exec()

            const userDocumentsDto = userDocuments.map(u => {

                return userResponseDto(u, undefined, true)

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

    async function updateMyUserData(req){

        try {

            const {
                firstName,
                lastName,
                email,
                settings,
                newPassword,
                currentPassword
            } = userRequestDto(req.body)

            const userDocument = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            if(!userDocument) return notFoundHandler('User')

            if(newPassword && newPassword.length < 8){

                return errorHandler(406, 'New password too short')

            }

            if(newPassword && !/\d/.test(newPassword)){

                return errorHandler(406, 'New password does not contain a number')

            }

            if(
                (
                    (
                        email !== userDocument.email
                        && email !== undefined
                    )
                    || newPassword
                )
                && !currentPassword
            ){

                return errorHandler(403, 'Current password not provided')

            }

            if(
                (email || newPassword)
                && currentPassword
            ){

                const matchingPasswords = passwordsMatch(currentPassword, userDocument.passwordHash)

                if(!matchingPasswords){

                    return errorHandler(406, 'Wrong password')

                }

                if(matchingPasswords){

                    if(newPassword) userDocument.passwordHash = await encryptPassword(newPassword)
                    if(email) userDocument.email = email

                }

            }

            if(firstName) userDocument.firstName = firstName
            if(lastName) userDocument.lastName = lastName
            if(settings) userDocument.settings = settings

            const result = await userDocument.save()
            const userDocumentDto = userResponseDto(result, req.user._id)

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

    async function updateOtherUserData(req){

        try {

            const currentUser = await UserModel.findOne({ _id:req.user_id }).exec()

            if(!currentUser) return notFoundHandler()

            if(!currentUser.isAdmin && !currentUser.isSuperuser){

                return errorHandler(403, 'Forbidden')

            }

            const {
                firstName,
                lastName,
                email,
                settings,
                profilePicture
            } = userRequestDto(req.body)

            const userDocument = await UserModel
                .findOne({ _id:req.params._id })
                .exec()

            if(!userDocument) return notFoundHandler('User')

            if(firstName) userDocument.firstName = firstName
            if(lastName) userDocument.lastName = lastName
            if(email) userDocument.email = email
            if(settings) userDocument.settings = settings
            if(profilePicture) userDocument.profilePicture = profilePicture

            const result = await userDocument.save()
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

    async function createUser(req){

        try {

            const { _id } = req.user

            const currentUser = await UserModel.findOne({ _id }).exec()

            if(!currentUser) return notFoundHandler()

            if(!currentUser.isAdmin && !currentUser.isSuperuser){

                return errorHandler(403, 'Forbidden')

            }

            const {
                username,
                firstName,
                lastName,
                email,
                password,
                roles
            } = userRequestDto(req.body)

            const passwordHash = await encryptPassword(password)

            const newUserDocument = new UserModel({
                username,
                passwordHash,
                firstName,
                lastName,
                email,
                roles
            })

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

    async function deleteUser(req){

        try {

            const currentUser = await UserModel.findOne({ _id:req.user._id }).exec()

            if(!currentUser) return notFoundHandler()

            if(!currentUser.isAdmin && !currentUser.isSuperuser){

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

    // async function getProfilePicture(req){
    //
    //     try {
    //
    //         const file = filename = req.params.filename
    //
    //         return path.join(
    //             profilePicturePath,
    //             req.params.filename
    //         )
    //
    //
    //     } catch (error) {
    //
    //         if(mode === 'DEV'){
    //
    //             console.log(error)
    //
    //             // return errorHandler(500, error)
    //
    //         }
    //
    //         if(mode === 'PROD'){
    //
    //             // return errorHandler(500, 'Unknown error')
    //
    //         }
    //
    //     }
    //
    // }

    async function uploadProfilePicture(req){

        try {

            const userDocument = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            if(!userDocument) return notFoundHandler('User')

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
        getMyUserData,
        getOtherUserData,
        getUsers,
        createUser,
        updateMyUserData,
        updateOtherUserData,
        deleteUser,
        // getProfilePicture,
        uploadProfilePicture,
    }

}
