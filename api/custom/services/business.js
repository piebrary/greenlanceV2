module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, notFoundHandler, successHandler, errorHandler, getCurrentUser

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { getCurrentUser = require('../../custom/utils/getCurrentUser') } catch { getCurrentUser = require('../../default/utils/getCurrentUser') }

    const BusinessModel = require('../../custom/models/business')
    const getCurrentBusiness = require('../../custom/utils/getCurrentBusiness')
    const businessAsSelfRequestDto = require('../../custom/dto/request/business/businessAsSelf')
    const businessAsSelfResponseDto = require('../../custom/dto/response/business/businessAsSelf')

    return {
        getBusiness,
        getBusinessById,
        createBusiness,
        addUserToBusiness,
        // updateBusinessById,
        deleteBusinessById
    }

    async function getBusiness(req){

        try {

            const businessDoc = await getCurrentBusiness(req)

            if(!businessDoc) return notFoundHandler('Business')

            const businessDocDto = businessAsSelfResponseDto(businessDoc)

            return successHandler(undefined, businessDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getBusinessById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            const businessDocument = await BusinessModel.find({ _id:req.params._id })

            if(
                currentUserDoc.roles.includes('admin')
                || businessDocument.users.includes(currentUserDoc._id)
            ){

                const businessDocumentDto = businessAsBusinessResponseDto(businessDocument)

                return successHandler(undefined, businessDocumentDto)

            }

            if(currentUserDoc.roles.includes('freelancer')){

                const businessDocumentDto = businessAsFreelancerResponseDto(businessDocument)

                return successHandler(undefined, businessDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createBusiness(_id, businessName){

        try {

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const newBusinessDoc = new BusinessModel()

                newBusinessDoc.users.push(_id)
                newBusinessDoc.name = businessName

                const newMutationDoc = new MutationModel({
                    user:_id,
                    action:'create client',
                })

                newBusinessDoc.mutations.push(newMutationDoc._id)

                response = await newBusinessDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const newBusinessDocDto = businessAsSelfResponseDto(response)

            return successHandler(undefined, newBusinessDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function addUserToBusiness(req){

        try {

            const businessDto = businessAsSelfRequestDto(req.body)

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const businessDocument = await BusinessModel
                    .findOne({ users:req.user._id })

                if(!businessDocument) return notFoundHandler('Business')

                const currentUserDoc = await getCurrentUser(req)
                if(!currentUserDoc) return notFoundHandler('User')

                const targetUserDoc = await UserModel
                    .findOne({ _id:req.body.user })
                if(!targetUserDoc) return notFoundHandler('User')

                if(
                    currentUserDoc.roles.includes('admin')
                    || businessDocument.users.includes(currentUserDoc._id)
                ){

                    businessDocument.users.push(req.body.user)

                }

                response = await businessDocument.save()

            })

            session.endSession()

            const newBusinessDocDto = businessAsSelfResponseDto(response)

            return successHandler(undefined, newBusinessDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    // async function updateBusinessById(req){
    //
    //     try {
    //
    //         const currentUserDoc = await getCurrentUser(req)
    //
    //         if(!currentUserDoc.roles.includes('business')) return errorHandler(403, 'Forbidden')
    //
    //         const businessDto = businessRequestDto(req.body)
    //
    //         const businessDoc = await BusinessModel.findOne({ _id:req.params._id })
    //
    //         if(!businessDoc) return notFoundHandler('Business')
    //
    //         let response
    //
    //         const session = await connection.startSession()
    //         await session.withTransaction(async () => {
    //
    //             if(name) businessDoc.name = name
    //             if(description) businessDoc.description = description
    //             if(label) businessDoc.label = label
    //             if(datetime) businessDoc.datetime = datetime
    //             if(location) businessDoc.location = location
    //             if(active) businessDoc.active = active
    //
    //             const newMutationDoc = new MutationModel({
    //                 user:req.user._id,
    //                 action:'update',
    //                 data:businessDto
    //             })
    //
    //             response = await businessDoc.save()
    //             await newMutationDoc.save()
    //
    //         })
    //
    //         session.endSession()
    //
    //         const businessDocDto = businessAsBusinessResponseDto(response)
    //
    //         return successHandler(undefined, businessDocDto)
    //
    //     } catch (error) {
    //
    //         return errorHandler(undefined, error)
    //
    //     }
    //
    // }

    async function deleteBusinessById(req){

        // only for business

        try {

            const currentUserDoc = await getCurrentUser(req)
            const currentBusinessDoc = await getCurrentBusiness(req)

            if(
                !currentUserDoc.roles.includes('admin')
                || currentBusinessDoc._id !== req.params._id
            ){

                return errorHandler(403, 'Forbidden')

            }

            const businessDocument = await BusinessModel.findOneAndDelete({ _id:req.params._id })

            if(!businessDocument) return notFoundHandler('Business')

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
