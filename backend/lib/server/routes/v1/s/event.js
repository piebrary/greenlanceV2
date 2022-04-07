const passport = require('passport')

const EventService = require('../../../../services/event')

module.exports = (express, config) => {

    const apiPrefix = config.PREFIX
    const secret = config.SECRET
    const mode = config.MODE

    const eventService = EventService(mode)

    express.get(
        apiPrefix + '/s/v1/events',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.getEvents(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        apiPrefix + '/s/v1/event',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.getEvent(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.post(
        apiPrefix + '/s/v1/event',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.createEvent(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.put(
        apiPrefix + '/s/v1/event',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.updateEvent(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.delete(
        apiPrefix + '/s/v1/event',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await eventService.deleteEvent(req)

            res
                .status(result.status)
                .end()

        }
    )

}
