const passport = require('passport')

module.exports = (express, config) => {

    let EmailService

    try {
        EmailService = require('../../../../../custom/services/email')
    } catch {
        EmailService = require('../../../../../default/services/email')
    }

    const prefix = config.PREFIX
    const secret = config.SECRET
    const mode = config.MODE

    const emailService = EmailService(mode)

    express.post(
        prefix + '/v1/s/email',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const sendEmailResponse = await emailService.sendEmail(req)

            res
                .status(sendEmailResponse.status)
                .send(sendEmailResponse.body)

        }

    )

}
