const UserModel = require('../models/user')

const notFoundHandler = require('../handlers/notFound')
const successHandler = require('../handlers/success')
const errorHandler = require('../handlers/error')

const userResponseDto = require('../dto/response/user')
const userRequestDto = require('../dto/request/user')

const encryptPassword = require('../utils/encryptPassword')
const passwordsMatch = require('../utils/passwordsMatch')

// const validate = require('../utils/validator')()

module.exports = mode => {

    async function getMyUserData(req){

        try {

            const { _id } = req.user

            const userDocument = await UserModel
                .findOne({ _id:req.user._id })
                .exec()

            if(!userDocument) return resourceNotFoundHandler('User')

            const userDocumentDto = userResponseDto(userDocument)

            return successHandler(userDocumentDto)

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

            const { _id } = req.params

            const userDocument = await UserModel
                .findOne({ _id })
                .exec()

            if(!userDocument) return resourceNotFoundHandler('User')

            const userDocumentDto = userResponseDto(userDocument)

            return successHandler(userDocumentDto)

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

    async function updateMyUserCredentials(req){

        try {

            const { _id } = req.user

            const {
                username,
                email,
                currentPassword,
                newPassword
            } = userRequestDto(req.body)

            if(newPassword && newPassword.length < 8){

                return errorHandler(406, 'New password too short')

            }

            if(newPassword && !/\d/.test(newPassword)){

                return errorHandler(406, 'New password does not contain a number')

            }

            const userDocument = await UserModel
                .findOne({ _id })
                .exec()

            if(!userDocument){

                return resourceNotFoundHandler('User')

            }

            const isMatchingPassword = await passwordsMatch(currentPassword, userDocument.passwordHash)

            if(!isMatchingPassword){

                return errorHandler(406, 'Wrong password')

            }

            if(username){

                userDocument.username = username

            }

            if(email){

                userDocument.email = email

            }

            if(newPassword){

                userDocument.passwordHash = await encryptPassword(newPassword)

            }

            const result = await userDocument.save()
            const userDocumentDto = userResponseDto(result)

            return successHandler(userDocumentDto)

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

    async function updateMyUserData(req){

        try {

            const { _id } = req.user

            const {
                firstName,
                lastName,
                business,
                email,
                settings,
            } = userRequestDto(req.body)

            const userDocument = await UserModel
                .findOne({ _id })
                .exec()

            if(!userDocument) return resourceNotFoundHandler('User')

            if(firstName){

                userDocument.firstName = firstName

            }

            if(lastName){

                userDocument.lastName = lastName

            }

            if(business){

                userDocument.business = business

            }

            if(email){

                userDocument.email = email

            }

            if(settings){// && validate.settings(settings)){

                userDocument.settings = settings

            }

            const result = await userDocument.save()
            const userDocumentDto = userResponseDto(result)

            return successHandler(userDocumentDto)

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

            const { _id } = req.params

            const {
                firstName,
                lastName,
                business,
                email,
                settings,
            } = userRequestDto(req.body)

            const userDocument = await UserModel
                .findOne({ _id })
                .exec()

            if(!userDocument) return resourceNotFoundHandler('User')

            if(firstName){

                userDocument.firstName = firstName

            }

            if(lastName){

                userDocument.lastName = lastName

            }

            if(business){

                userDocument.business = business

            }

            if(email){

                userDocument.email = email

            }

            if(settings){// && validate.settings(settings)){

                userDocument.settings = settings

            }

            const result = await userDocument.save()
            const userDocumentDto = userResponseDto(result)

            return successHandler(userDocumentDto)

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

            if(!currentUser) return resourceNotFoundHandler()

            if(!currentUser.isAdmin && !currentUser.isSuperuser){

                return errorHandler(403, 'Forbidden')

            }

            const {
                username,
                business,
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
                business,
                firstName,
                lastName,
                email,
                roles
            })

            const result = await newUserDocument.save()
            const userDocumentDto = userResponseDto(result)

            return successHandler(userDocumentDto)

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

            const { _id } = req.params

            const result = UserModel
                .findOneAndDelete({ _id })
                .exec()

            return successHandler()

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

    return {
        getMyUserData,
        getOtherUserData,
        createUser,
        updateMyUserCredentials,
        updateMyUserData,
        updateOtherUserData,
        deleteUser
    }

}
