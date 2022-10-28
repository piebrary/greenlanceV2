const passport = require('passport')

module.exports = server => {

    const { express } = server

    let EmailService

    try {
        EmailService = require('../../../../../custom/services/email')
    } catch {
        EmailService = require('../../../../../default/services/email')
    }

    const emailService = EmailService(process.env.ENVIRONMENT)

    express.post(
        process.env.API_PREFIX + '/v1/s/email',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const sendEmailResponse = await emailService.sendEmail(req)

            res
                .status(sendEmailResponse.status)
                .send(sendEmailResponse.body)

        }

    )

}
