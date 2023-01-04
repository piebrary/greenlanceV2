module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let notFoundHandler, successHandler, errorHandler, getCurrentFreelancer, getCurrentClient

    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }

    const FreelancerModel = require('../../custom/models/freelancer')
    const ClientModel = require('../../custom/models/client')
    const businessAsAllRequestDto = require('../../custom/dto/request/business/businessAsAll')
    const businessAsAllResponseDto = require('../../custom/dto/response/business/businessAsAll')

    const ClientService = require('./client')
    const clientService = await ClientService(server)
    const FreelancerService = require('./freelancer')
    const freelancerService = await FreelancerService(server)

    return {
        // getBusinesses,
        createBusiness,
        requestBusinessConnection,
    }

    // async function getBusinesses(req){
    //
    //     try {
    //
    //     let response
    //
    //     const session = await connection.startSession()
    //     await session.withTransaction(async () => {
    //
    //         const freelancers = await FreelancerModel
    //             .find()
    //             .select('name')
    //
    //         const clients = await ClientModel
    //             .find()
    //             .select('name')
    //
    //         response = [...freelancers, ...clients]
    //
    //     })
    //
    //     session.endSession()
    //
    //     const newBusinessAsAllResponseDto = businessAsAllResponseDto(response)
    //
    //     return successHandler(undefined, newBusinessAsAllResponseDto)
    //
    //     } catch (error) {
    //
    //         return errorHandler(undefined, error)
    //
    //     }
    //
    // }

    async function createBusiness(req){

        try {

            const {
                type,
                name
            } = businessAsAllRequestDto(req.body)

            const client = await ClientModel.findOne({ users:req.user._id })
            const freelancer = await FreelancerModel.findOne({ users:req.user._id })

            if(client || freelancer) return errorHandler(409, 'User is already registered to a business')
            if(!type) return errorHandler(409, 'A business type must be given')
            if(!name) return errorHandler(409, 'A business name must be given')

            const clientByName = await ClientModel.findOne({ name: { '$regex': name, $options:'i' } })
            const freelancerByName = await FreelancerModel.findOne({ name: { '$regex': name, $options:'i' } })

            if(clientByName || freelancerByName) return errorHandler(409, 'A company with that name already exists')

            if(type === 'client') return clientService.createClient(req)
            if(type === 'freelancer') return freelancerService.createFreelancer(req)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function requestBusinessConnection(){



    }

}
