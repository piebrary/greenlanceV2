const passport = require('passport')

module.exports = express => {

    let UserService, upload

    try {
        UserService = require('../../../../../custom/services/user')
    } catch {
        UserService = require('../../../../../default/services/user')
    }

    const userService = UserService(process.env.ENVIRONMENT)

    try {
        upload = require('../../../../../custom/utils/uploadProfilePictureMiddleware')
    } catch {
        upload = require('../../../../../default/utils/uploadProfilePictureMiddleware')
    }

    express.get(
        process.env.API_PREFIX + '/v1/s/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getUser(req)

            res
                .status(userData.status)
                .send('test')

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/users',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const usersData = await userService.getUsers(req)

            res
                .status(usersData.status)
                .send(usersData.body)

        }
    )

    express.post(
        process.env.API_PREFIX + '/v1/s/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.createUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }

    )

    express.put(
        process.env.API_PREFIX + '/v1/s/user/',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.updateUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.put(
        process.env.API_PREFIX + '/v1/s/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.updateUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.delete(
        process.env.API_PREFIX + '/v1/s/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.deleteUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }

    )

    express.post(
        process.env.API_PREFIX + '/v1/s/user/picture',
        passport.authenticate('jwt', { session: false }),
        upload.single('picture'),
        async (req, res) => {

            const result = await userService.uploadProfilePicture(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

}
