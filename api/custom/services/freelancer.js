module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, FreelancerModel, notFoundHandler, successHandler, errorHandler, freelancerRequestDto, freelancerResponseDto, getCurrentUser

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { BusinessModel = require('../../custom/models/business') } catch { BusinessModel = require('../../default/models/business') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { FreelancerModel = require('../../custom/models/freelancer') } catch { FreelancerModel = require('../../default/models/freelancer') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { freelancerAsSelfRequestDto = require('../../custom/dto/request/freelancer/freelancerAsSelf/') } catch { freelancerAsSelfRequestDto = require('../../default/dto/request/freelancer/freelancerAsSelf') }
    try { freelancerAsSelfResponseDto = require('../../custom/dto/response/freelancer/freelancerAsSelf') } catch { freelancerAsSelfResponseDto = require('../../default/dto/response/freelancer/freelancerAsSelf') }
    try { freelancerAsBusinessRequestDto = require('../../custom/dto/request/freelancer/freelancerAsBusiness/') } catch { freelancerAsBusinessRequestDto = require('../../default/dto/request/freelancer/freelancerAsBusiness') }
    try { freelancerAsBusinessResponseDto = require('../../custom/dto/response/freelancer/freelancerAsBusiness') } catch { freelancerAsBusinessResponseDto = require('../../default/dto/response/freelancer/freelancerAsBusiness') }
    try { getCurrentUser = require('../../custom/utils/getCurrentUser') } catch { getCurrentUser = require('../../default/utils/getCurrentUser') }

    return {
        getFreelancers,
        getFreelancerById,
        createFreelancer,
        // updateFreelancerById,
        deleteFreelancerById
    }

    async function getFreelancer(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer'){

                const currentFreelancerDoc = await getCurrentFreelancer(req)

                const freelancerDocumentDto = freelancerAsSelfResponseDto(freelancerDocuments)

                return successHandler(undefined, freelancerDocumentsDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getFreelancers(req){

        try {

            const user_id = req.user._id

            const currentBusinessDoc = await getCurrentBusiness(req)

            if(!currentBusinessDoc) return notFoundHandler('User')

            const freelancerDocuments = await BusinessModel.find({ users:req.user._id }).populate('freelancers')

            const freelancerDocumentsDto = freelancerAsBusinessResponseDto(freelancerDocuments)

            return successHandler(undefined, freelancerDocumentsDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getFreelancerById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(
                currentUserDoc.roles.includes('business')
                || currentUserDoc.roles.includes('admin')
            ){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const freelancerDocument = await FreelancerModel.find({ _id:req.params._id, business:currentBusinessDoc._id })

                const freelancerDocumentDto = freelancerAsBusinessResponseDto(freelancerDocument))

                return successHandler(undefined, freelancerDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createFreelancer(req){

        try {

            const currentUserDoc = await getCurrentUser(req)
            if(!currentUserDoc.roles.includes('freelancer')) return errorHandler(403, 'Forbidden')

            const freelancerDto = freelancerAsSelfRequestDto(req.body)

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                freelancerDto.creator = currentUserDoc._id

                const newFreelancerDoc = new FreelancerModel(freelancerDto)

                const newMutationDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'create',
                    data:freelancerDto
                })

                newFreelancerDoc.mutations.push(newMutationDoc._id)

                response = await newFreelancerDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const newFreelancerDocDto = freelancerAsSelfResponseDto(response)

            return successHandler(undefined, newFreelancerDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    // async function updateFreelancerById(req){
    //
    //     try {
    //
    //         const currentUserDoc = await getCurrentUser(req)
    //
    //         if(!currentUserDoc.roles.includes('business')) return errorHandler(403, 'Forbidden')
    //
    //         const freelancerDto = freelancerRequestDto(req.body)
    //
    //         const freelancerDoc = await FreelancerModel.findOne({ _id:req.params._id })
    //
    //         if(!freelancerDoc) return notFoundHandler('Freelancer')
    //
    //         let response
    //
    //         const session = await connection.startSession()
    //         await session.withTransaction(async () => {
    //
    //             if(name) freelancerDoc.name = name
    //             if(description) freelancerDoc.description = description
    //             if(label) freelancerDoc.label = label
    //             if(datetime) freelancerDoc.datetime = datetime
    //             if(location) freelancerDoc.location = location
    //             if(active) freelancerDoc.active = active
    //
    //             const newMutationDoc = new MutationModel({
    //                 user:req.user._id,
    //                 action:'update',
    //                 data:freelancerDto
    //             })
    //
    //             response = await freelancerDoc.save()
    //             await newMutationDoc.save()
    //
    //         })
    //
    //         session.endSession()
    //
    //         const freelancerDocDto = freelancerAsBusinessResponseDto(response)
    //
    //         return successHandler(undefined, freelancerDocDto)
    //
    //     } catch (error) {
    //
    //         return errorHandler(undefined, error)
    //
    //     }
    //
    // }

    async function deleteFreelancerById(req){

        // only for freelancer

        try {

            const currentUserDoc = await getCurrentUser(req)
            const currentFreelancerDoc = await getCurrentFreelancer(req)

            if(
                !currentUserDoc.roles.includes('admin')
                || currentFreelancerDoc._id !== req.params._id
            ){

                return errorHandler(403, 'Forbidden')

            }

            const freelancerDocument = await FreelancerModel.findOneAndDelete({ _id:req.params._id })

            if(!freelancerDocument) return notFoundHandler('Freelancer')

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
