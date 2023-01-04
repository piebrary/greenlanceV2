const passport = require('passport')

module.exports = async server => {

    const { express } = server

    const ClientService = require('../../../../../custom/services/client')

    const clientService = await ClientService(server)

    express.get(
        process.env.API_PREFIX + '/v1/s/client',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await clientService.getClient(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/client/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await clientService.getClientById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    // express.put(
    //     process.env.API_PREFIX + '/v1/s/client/:_id',
    //     passport.authenticate('jwt', { session: false }),
    //     async (req, res) => {
    //
    //         const result = await clientService.updateClientById(req)
    //
    //         res
    //             .status(result.status)
    //             .send(result.body)
    //
    //     }
    // )

    express.post(
        process.env.API_PREFIX + '/v1/s/client/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await clientService.addUserToClient(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.post(
        process.env.API_PREFIX + '/v1/s/client',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await clientService.createClient(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.delete(
        process.env.API_PREFIX + '/v1/s/client/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await clientService.deleteClientById(req)

            res
                .status(result.status)
                .end()

        }
    )

}
