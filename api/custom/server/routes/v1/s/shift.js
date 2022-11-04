const passport = require('passport')

module.exports = async server => {

    const { express } = server

    let ShiftService

    try {
        ShiftService = require('../../../../../custom/services/shift')
    } catch {
        ShiftService = require('../../../../../default/services/shift')
    }

    const shiftService = await ShiftService(server)

    express.get(
        process.env.API_PREFIX + '/v1/s/shifts',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.getShifts(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/shift/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.getShiftById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.post(
        process.env.API_PREFIX + '/v1/s/shift',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.createShift(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.put(
        process.env.API_PREFIX + '/v1/s/shift/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.updateShiftById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.delete(
        process.env.API_PREFIX + '/v1/s/shift/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.deleteShiftById(req)

            res
                .status(result.status)
                .end()

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/shift/apply/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.applyById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/shift/withdraw/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.withdrawById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/shift/accept/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.acceptById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/shift/decline/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.declineById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/shift/checkIn/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.checkInById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/shift/checkOut/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await shiftService.checkOutById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

}
