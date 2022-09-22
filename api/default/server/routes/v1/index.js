module.exports = express => {

    let AuthService

    try {
        AuthService = require('../../../../custom/services/auth')
    } catch {
        AuthService = require('../../../../default/services/auth')
    }

    const authService = AuthService(process.env.ENVIRONMENT)

    if(process.env.API_ENABLE_PUBLIC_REGISTRATION){

        express.post(
            process.env.API_PREFIX + '/v1/register',
            async (req, res) => {

                const userData = await authService.register(req)

                res
                    .status(userData.status)
                    .send(userData.body)

            }

        )

        express.post(
            process.env.API_PREFIX + '/v1/passwordResetRequest',
            async (req, res) => {

                const result = await authService.passwordResetRequest(req)

                res
                    .status(result.status)
                    .send(result.body)

            }

        )

        express.post(
            process.env.API_PREFIX + '/v1/passwordReset',
            async (req, res) => {

                const result = await authService.passwordReset(req)

                res
                    .status(result.status)
                    .send(result.body)

            }

        )

    }

}
