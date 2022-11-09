const passport = require('passport')

module.exports = async server => {

    const { express } = server

    const FreelancerService = require('../../../../../custom/services/freelancer')

    const freelancerService = await FreelancerService(server)

    express.get(
        process.env.API_PREFIX + '/v1/s/freelancer',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await freelancerService.getFreelancer(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/freelancers/all',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await freelancerService.getFreelancers(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/freelancer/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await freelancerService.getFreelancerById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.post(
        process.env.API_PREFIX + '/v1/s/freelancers',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await freelancerService.getFreelancersById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.put(
        process.env.API_PREFIX + '/v1/s/freelancer/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await freelancerService.updateFreelancerById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.delete(
        process.env.API_PREFIX + '/v1/s/freelancer/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await freelancerService.deleteFreelancerById(req)

            res
                .status(result.status)
                .end()

        }
    )

}
