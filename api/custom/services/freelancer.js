module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, FreelancerModel, notFoundHandler, successHandler, errorHandler, getCurrentUser

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { ClientModel = require('../../custom/models/client') } catch { ClientModel = require('../../default/models/client') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { FreelancerModel = require('../../custom/models/freelancer') } catch { FreelancerModel = require('../../default/models/freelancer') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { getCurrentUser = require('../../custom/utils/getCurrentUser') } catch { getCurrentUser = require('../../default/utils/getCurrentUser') }
    try { userAsSelfResponseDto = require('../../custom/dto/response/user/userAsSelf') } catch { userAsSelfResponseDto = require('../../default/dto/response/user/userAsSelf') }

    const freelancerAsSelfRequestDto = require('../../custom/dto/request/freelancer/freelancerAsSelf')
    const freelancerAsSelfResponseDto = require('../../custom/dto/response/freelancer/freelancerAsSelf')
    const freelancerAsClientRequestDto = require('../../custom/dto/request/freelancer/freelancerAsClient')
    const freelancerAsClientResponseDto = require('../../custom/dto/response/freelancer/freelancerAsClient')
    const businessAsAllRequestDto = require('../../custom/dto/request/business/businessAsAll')

    const getCurrentClient = require('../../custom/utils/getCurrentClient')
    const getCurrentFreelancer = require('../../custom/utils/getCurrentFreelancer')

    return {
        getFreelancer,
        getFreelancers,
        getFreelancerById,
        getFreelancersById,
        createFreelancer,
        // updateFreelancerById,
        deleteFreelancerById
    }

    async function getFreelancer(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer')){

                const currentFreelancerDoc = await getCurrentFreelancer(req)

                const freelancerDocumentDto = freelancerAsSelfResponseDto(currentFreelancerDoc)

                return successHandler(undefined, freelancerDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getFreelancers(req){

        // this is not correct, fix later

        try {

            const user_id = req.user._id

            const currentClientDoc = await getCurrentClient(req)

            if(!currentClientDoc) return notFoundHandler('User')

            const freelancerDocuments = await ClientModel
                .find({ users:req.user._id })
                .populate('freelancers')

            const freelancerDocumentsDto = freelancerAsClientResponseDto(freelancerDocuments)

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
                currentUserDoc.roles.includes('client')
                || currentUserDoc.roles.includes('admin')
            ){

                const currentClientDoc = await getCurrentClient(req)

                const freelancerDocument = await FreelancerModel.find({ _id:req.params._id, client:currentClientDoc._id })

                const freelancerDocumentDto = freelancerAsClientResponseDto(freelancerDocument)

                return successHandler(undefined, freelancerDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getFreelancersById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(
                currentUserDoc.roles.includes('client')
                || currentUserDoc.roles.includes('admin')
            ){

                const freelancerDocuments = await FreelancerModel.find({ _id:req.body.ids })

                const freelancerDocumentsDto = freelancerAsClientResponseDto(freelancerDocuments)

                return successHandler(undefined, freelancerDocumentsDto)

            }

            return errorHandler(403, 'Forbidden')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createFreelancer(req){

        try {

            const {
                type,
                name
            } = businessAsAllRequestDto(req.body)

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const newFreelancerDoc = new FreelancerModel()

                newFreelancerDoc.users.push(req.user._id)
                newFreelancerDoc.name = name

                const newMutationDoc = new MutationModel({
                    user:req.user._id,
                    action:'create freelancer',
                })

                newFreelancerDoc.mutations.push(newMutationDoc._id)

                await newFreelancerDoc.save()
                await newMutationDoc.save()

                const currentUser = await getCurrentUser(req)

                currentUser.roles.push('freelancer')

                const newCurrentUserMutationDoc = new MutationModel({
                    user:req.user._id,
                    action:'add freelancer role',
                })

                response = await currentUser.save()
                await newCurrentUserMutationDoc.save()

            })

            session.endSession()

            const newUserDocDto = userAsSelfResponseDto(response)

            return successHandler(undefined, newUserDocDto)

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
    //         if(!currentUserDoc.roles.includes('client')) return errorHandler(403, 'Forbidden')
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
    //         const freelancerDocDto = freelancerAsClientResponseDto(response)
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
