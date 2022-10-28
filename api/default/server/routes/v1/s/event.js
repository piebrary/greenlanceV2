const passport = require('passport')

module.exports = async server => {

    const { express } = server

    let EventService

    try {
        EventService = require('../../../../../custom/services/event')
    } catch {
        EventService = require('../../../../../default/services/event')
    }

    const eventService = await EventService(server)

    express.get(
        process.env.API_PREFIX + '/v1/s/events',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.getEvents(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/event/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.getEventById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.post(
        process.env.API_PREFIX + '/v1/s/event',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.createEvent(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.put(
        process.env.API_PREFIX + '/v1/s/event/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.updateEventById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.delete(
        process.env.API_PREFIX + '/v1/s/event/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.deleteEventById(req)

            res
                .status(result.status)
                .end()

        }
    )

}
