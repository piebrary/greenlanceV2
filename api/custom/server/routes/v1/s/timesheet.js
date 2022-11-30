const passport = require('passport')

module.exports = async server => {

    const { express } = server

    const TimesheetService = require('../../../../../custom/services/timesheet')
    const timesheetService = await TimesheetService(server)

    // express.get(
    //     process.env.API_PREFIX + '/v1/s/timesheet/accept/:_id',
    //     passport.authenticate('jwt', { session: false }),
    //     async (req, res) => {
    //
    //         const result = await timesheetService.acceptTimesheetActual(req)
    //
    //         res
    //             .status(result.status)
    //             .send(result.body)
    //
    //     }
    // )

    express.get(
        process.env.API_PREFIX + '/v1/s/timesheet/dispute/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await timesheetService.disputeTimesheetActual(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.put(
        process.env.API_PREFIX + '/v1/s/timesheet/actual/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await timesheetService.updateTimesheetActual(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/timesheet/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await timesheetService.getTimesheetById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/timesheets',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await timesheetService.getTimesheets(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/timesheets/accepted',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await timesheetService.getAcceptedTimesheets(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    // express.get(
    //     process.env.API_PREFIX + '/v1/s/timesheet/checkIn',
    //     passport.authenticate('jwt', { session: false }),
    //     async (req, res) => {
    //
    //         const result = await timesheetService.checkInById(req)
    //
    //         res
    //             .status(result.status)
    //             .send(result.body)
    //
    //     }
    // )
    //
    // express.get(
    //     process.env.API_PREFIX + '/v1/s/timesheet/checkOut',
    //     passport.authenticate('jwt', { session: false }),
    //     async (req, res) => {
    //
    //         const result = await timesheetService.checkOutById(req)
    //
    //         res
    //             .status(result.status)
    //             .send(result.body)
    //
    //     }
    // )

}
