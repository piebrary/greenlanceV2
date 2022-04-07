const passport = require('passport')

const UserService = require('../../../../services/user')

module.exports = (express, config) => {

    const prefix = config.PREFIX
    const secret = config.SECRET
    const mode = config.MODE

    const userService = UserService(mode)

    express.get(
        prefix + '/s/v1/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getMyUserData(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.get(
        prefix + '/s/v1/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getOtherUserData(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.put(
        prefix + '/s/v1/user/credentials',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.updateMyUserCredentials(req)

            res
                .status(userData.status)
                .send(userData.body)

        }

    )

    express.put(
        prefix + '/s/v1/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.updateMyUserData(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.put(
        prefix + '/s/v1/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.updateOtherUserData(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.post(
        prefix + '/s/v1/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.createUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }

    )

    express.delete(
        prefix + '/s/v1/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.deleteUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }

    )

}
