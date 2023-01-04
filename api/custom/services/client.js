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
    try { userAsSelfResponseDto = require('../../custom/dto/response/user/userAsSelf') } catch { userAsSelfResponseDto = require('../../default/dto/response/user/userAsSelf') }

    const ClientModel = require('../../custom/models/client')
    const getCurrentClient = require('../../custom/utils/getCurrentClient')
    const clientAsSelfRequestDto = require('../../custom/dto/request/client/clientAsSelf')
    const clientAsSelfResponseDto = require('../../custom/dto/response/client/clientAsSelf')
    const businessAsAllRequestDto = require('../../custom/dto/request/business/businessAsAll')

    return {
        getClient,
        getClientById,
        createClient,
        addUserToClient,
        // updateClientById,
        deleteClientById
    }

    async function getClient(req){

        try {

            const clientDoc = await getCurrentClient(req)

            if(!clientDoc) return notFoundHandler('Client')

            const clientDocDto = clientAsSelfResponseDto(clientDoc)

            return successHandler(undefined, clientDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getClientById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            const clientDocument = await ClientModel.find({ _id:req.params._id })

            if(
                currentUserDoc.roles.includes('admin')
                || clientDocument.users.includes(currentUserDoc._id)
            ){

                const clientDocumentDto = clientAsClientResponseDto(clientDocument)

                return successHandler(undefined, clientDocumentDto)

            }

            if(currentUserDoc.roles.includes('freelancer')){

                const clientDocumentDto = clientAsFreelancerResponseDto(clientDocument)

                return successHandler(undefined, clientDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createClient(req){

        try {

            const {
                type,
                name
            } = businessAsAllRequestDto(req.body)

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const newClientDoc = new ClientModel()

                newClientDoc.users.push(req.user._id)
                newClientDoc.name = name

                const newMutationDoc = new MutationModel({
                    user:req.user._id,
                    action:'create client',
                })

                newClientDoc.mutations.push(newMutationDoc._id)

                await newClientDoc.save()
                await newMutationDoc.save()

                const currentUser = await getCurrentUser(req)

                currentUser.roles.push('client')

                const newCurrentUserMutationDoc = new MutationModel({
                    user:req.user._id,
                    action:'add client role',
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

    async function addUserToClient(req){

        try {

            const clientDto = clientAsSelfRequestDto(req.body)

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const clientDocument = await ClientModel
                    .findOne({ users:req.user._id })

                if(!clientDocument) return notFoundHandler('Client')

                const currentUserDoc = await getCurrentUser(req)
                if(!currentUserDoc) return notFoundHandler('User')

                const targetUserDoc = await UserModel
                    .findOne({ _id:req.body.user })
                if(!targetUserDoc) return notFoundHandler('User')

                if(
                    currentUserDoc.roles.includes('admin')
                    || clientDocument.users.includes(currentUserDoc._id)
                ){

                    clientDocument.users.push(req.body.user)

                }

                response = await clientDocument.save()

            })

            session.endSession()

            const newClientDocDto = clientAsSelfResponseDto(response)

            return successHandler(undefined, newClientDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    // async function updateClientById(req){
    //
    //     try {
    //
    //         const currentUserDoc = await getCurrentUser(req)
    //
    //         if(!currentUserDoc.roles.includes('client')) return errorHandler(403, 'Forbidden')
    //
    //         const clientDto = clientRequestDto(req.body)
    //
    //         const clientDoc = await ClientModel.findOne({ _id:req.params._id })
    //
    //         if(!clientDoc) return notFoundHandler('Client')
    //
    //         let response
    //
    //         const session = await connection.startSession()
    //         await session.withTransaction(async () => {
    //
    //             if(name) clientDoc.name = name
    //             if(description) clientDoc.description = description
    //             if(label) clientDoc.label = label
    //             if(datetime) clientDoc.datetime = datetime
    //             if(location) clientDoc.location = location
    //             if(active) clientDoc.active = active
    //
    //             const newMutationDoc = new MutationModel({
    //                 user:req.user._id,
    //                 action:'update',
    //                 data:clientDto
    //             })
    //
    //             response = await clientDoc.save()
    //             await newMutationDoc.save()
    //
    //         })
    //
    //         session.endSession()
    //
    //         const clientDocDto = clientAsClientResponseDto(response)
    //
    //         return successHandler(undefined, clientDocDto)
    //
    //     } catch (error) {
    //
    //         return errorHandler(undefined, error)
    //
    //     }
    //
    // }

    async function deleteClientById(req){

        // only for client

        try {

            const currentUserDoc = await getCurrentUser(req)
            const currentClientDoc = await getCurrentClient(req)

            if(
                !currentUserDoc.roles.includes('admin')
                || currentClientDoc._id !== req.params._id
            ){

                return errorHandler(403, 'Forbidden')

            }

            const clientDocument = await ClientModel.findOneAndDelete({ _id:req.params._id })

            if(!clientDocument) return notFoundHandler('Client')

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
