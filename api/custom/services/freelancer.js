module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, FreelancerModel, notFoundHandler, successHandler, errorHandler, freelancerRequestDto, freelancerResponseDto, getCurrentUser

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { FreelancerModel = require('../../custom/models/freelancer') } catch { FreelancerModel = require('../../default/models/freelancer') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { freelancerRequestDto = require('../../custom/dto/request/freelancer/freelancer/') } catch { freelancerRequestDto = require('../../default/dto/request/freelancer/freelancer') }
    try { freelancerResponseDto = require('../../custom/dto/response/freelancer/freelancer') } catch { freelancerResponseDto = require('../../default/dto/response/freelancer/freelancer') }
    try { getCurrentUser = require('../../custom/utils/getCurrentUser') } catch { getCurrentUser = require('../../default/utils/getCurrentUser') }

    return {
        getFreelancers,
        getFreelancerById,
        createFreelancer,
        updateFreelancerById,
        deleteFreelancerById,
    }

    async function getFreelancers(req){

        try {

            const user_id = req.user._id

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('business'){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const freelancerDocuments = await FreelancerModel.find({ business:currentBusinessDoc._id })

                const freelancerDocumentsDto = freelancerAsBusinessResponseDto(freelancerDocuments)

                return successHandler(undefined, freelancerDocumentsDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getFreelancerById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('business'){

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
            const currentBusinessDoc = await getCurrentBusiness(req)

            if(!currentBusinessDoc) return errorHandler(403, 'Forbidden')
            if(!currentUserDoc.roles.includes('business')) return errorHandler(403, 'Forbidden')

            const freelancerDto = freelancerRequestDto(req.body)

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

            const newFreelancerDocDto = freelancerAsBusinessResponseDto(response)

            return successHandler(undefined, newFreelancerDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function updateFreelancerById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc.roles.includes('business')) return errorHandler(403, 'Forbidden')

            const freelancerDto = freelancerRequestDto(req.body)

            const freelancerDoc = await FreelancerModel.findOne({ _id:req.params._id })

            if(!freelancerDoc) return notFoundHandler('Freelancer')

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(name) freelancerDoc.name = name
                if(description) freelancerDoc.description = description
                if(label) freelancerDoc.label = label
                if(datetime) freelancerDoc.datetime = datetime
                if(location) freelancerDoc.location = location
                if(active) freelancerDoc.active = active

                const newMutationDoc = new MutationModel({
                    user:req.user._id,
                    action:'update',
                    data:freelancerDto
                })

                response = await freelancerDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const freelancerDocDto = freelancerAsBusinessResponseDto(response)

            return successHandler(undefined, freelancerDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function deleteFreelancerById(req){

        // only for business

        try {

            const currentBusinessDoc = await getCurrentBusiness(req)

            if(!currentBusinessDoc) return errorHandler(403, 'Forbidden')

            const freelancerDocument = await FreelancerModel.findOneAndDelete({ _id:req.params._id })

            if(!freelancerDocument) return notFoundHandler('Freelancer')

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
