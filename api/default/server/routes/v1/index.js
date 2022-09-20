module.exports = express => {

    let UserService

    try {
        UserService = require('../../../../custom/services/user')
    } catch {
        UserService = require('../../../../default/services/user')
    }

    const userService = UserService(process.env.ENVIRONMENT)

    if(process.env.API_ENABLE_PUBLIC_REGISTRATION){

        express.post(
            process.env.API_PREFIX + '/v1/user',
            async (req, res) => {

                const userData = await userService.createUserPublic(req)

                res
                    .status(userData.status)
                    .send(userData.body)

            }

        )

    }

}
