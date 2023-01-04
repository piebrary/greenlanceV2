const passport = require('passport')

module.exports = async server => {

    const { express } = server

    const BusinessService = require('../../../../../custom/services/business')
    const businessService = await BusinessService(server)

    express.post(
        process.env.API_PREFIX + '/v1/s/business',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await businessService.createBusiness(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/business/connect/:businessName',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await businessService.requestBusinessConnection(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

}
