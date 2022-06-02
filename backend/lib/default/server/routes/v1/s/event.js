const passport = require('passport')

module.exports = (express, config) => {

    let EventService

    try { EventService = require('../../../../../custom/services/event') } catch { EventService = require('../../../../services/event') }

    const apiPrefix = config.PREFIX
    const secret = config.SECRET
    const mode = config.MODE

    const eventService = EventService(mode)

    express.get(
        apiPrefix + '/v1/s/events',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.getEvents(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        apiPrefix + '/v1/s/event',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.getEvent(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.post(
        apiPrefix + '/v1/s/event',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.createEvent(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.put(
        apiPrefix + '/v1/s/event',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.updateEvent(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.delete(
        apiPrefix + '/v1/s/event',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.deleteEvent(req)

            res
                .status(result.status)
                .end()

        }
    )

}
