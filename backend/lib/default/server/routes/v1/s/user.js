const passport = require('passport')

module.exports = (express, config) => {

    let UserService, upload

    try {
        UserService = require('../../../../../custom/services/user')
    } catch {
        UserService = require('../../../../../default/services/user')
    }

    const prefix = config.PREFIX
    const secret = config.SECRET
    const mode = config.MODE

    const userService = UserService(mode)

    try {
        upload = require('../../../../../custom/utils/uploadProfilePictureMiddleware')
    } catch {
        upload = require('../../../../../default/utils/uploadProfilePictureMiddleware')
    }

    express.get(
        prefix + '/v1/s/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.get(
        prefix + '/v1/s/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getUser(req)

            res
                .status(userData.status)
                .send('test')

        }
    )

    express.get(
        prefix + '/v1/s/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.get(
        prefix + '/v1/s/users',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const usersData = await userService.getUsers(req)

            res
                .status(usersData.status)
                .send(usersData.body)

        }
    )

    express.post(
        prefix + '/v1/s/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.createUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }

    )

    express.put(
        prefix + '/v1/s/user/',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.updateUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.put(
        prefix + '/v1/s/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.updateUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.delete(
        prefix + '/v1/s/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.deleteUser(req)

            res
                .status(userData.status)
                .send(userData.body)

        }

    )

    express.post(
        prefix + '/v1/s/user/picture',
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
