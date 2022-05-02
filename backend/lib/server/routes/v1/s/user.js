const passport = require('passport')

const UserService = require('../../../../services/user')

module.exports = (express, config) => {

    const prefix = config.PREFIX
    const secret = config.SECRET
    const mode = config.MODE

    const userService = UserService(mode)

    const upload = require('../../../../utils/uploadProfilePictureMiddleware')

    express.get(
        prefix + '/v1/s/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getMyUserData(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.get(
        prefix + '/v1/s/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.getOtherUserData(req)

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

    express.put(
        prefix + '/v1/s/user',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.updateMyUserData(req)

            res
                .status(userData.status)
                .send(userData.body)

        }
    )

    express.put(
        prefix + '/v1/s/user/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const userData = await userService.updateOtherUserData(req)

            res
                .status(userData.status)
                .send(userData.body)

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

    // express.get(
    //     prefix + '/v1/s/user/picture/:filename',
    //     passport.authenticate('jwt', { session: false }),
    //     async (req, res) => {
    //
    //         const result = await userService.getProfilePicture(req)
    //
    //         res.sendFile(result)
    //
    //
    //     }
    // )

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
