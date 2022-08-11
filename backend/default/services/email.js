const fs = require('fs')
const path = require('path')

const Mailer = require('nodemailer')

module.exports = mode => {

    let successHandler, errorHandler, logger

    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { logger = require('../../custom/utils/logger') } catch { logger = require('../../default/utils/logger') }

    const transporter = Mailer.createTransport({
    	sendmail: true,
    	newline: 'unix',
    	path: '/usr/sbin/sendmail',
    	dkim: {
    		domainName: 'piebrary.nl',
    		keySelector: 'default', // The key you used in your DKIM TXT DNS Record
    	}
    })

    async function sendEmail(req){

        try {

            const {
                to, from, subject, text, html
            } = req.body

            const result = await transporter.sendMail({
                to,
                from,
                subject,
                text,
                html
            })

            return successHandler(undefined)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(undefined, error)

            }

            if(mode === 'PROD'){

                return errorHandler(undefined, 'Unknown error')

            }

        }

    }

    return {
        sendEmail
    }

}
