const fs = require('fs')
const path = require('path')

const Mailer = require('nodemailer')

module.exports = () => {

    let successHandler, errorHandler, logger, mailer

    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { logger = require('../../custom/utils/logger') } catch { logger = require('../../default/utils/logger') }
    try { mailer = require('../../custom/utils/mailer')() } catch { mailer = require('../../default/utils/mailer')() }

    async function sendEmail(req){

        return mailer.sendMail(req.body)

    }

    return {
        sendEmail
    }

}
