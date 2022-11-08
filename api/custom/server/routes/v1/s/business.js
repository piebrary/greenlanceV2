const passport = require('passport')

module.exports = async server => {

    const { express } = server

    const BusinessService = require('../../../../../custom/services/business')

    const businessService = await BusinessService(server)

    express.get(
        process.env.API_PREFIX + '/v1/s/business',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await businessService.getBusiness(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/business/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await businessService.getBusinessById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.put(
        process.env.API_PREFIX + '/v1/s/business/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await businessService.updateBusinessById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.delete(
        process.env.API_PREFIX + '/v1/s/business/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await businessService.deleteBusinessById(req)

            res
                .status(result.status)
                .end()

        }
    )

}
