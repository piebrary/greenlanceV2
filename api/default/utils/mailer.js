const Mailer = require('nodemailer')

module.exports = () => {

    let successHandler, errorHandler

    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }

    const transporter = Mailer.createTransport({
    	sendmail: true,
    	newline: 'unix',
    	path: '/usr/sbin/sendmail',
    	dkim: {
    		domainName: 'piebrary.nl',
    		keySelector: 'default', // The key you used in your DKIM TXT DNS Record
    	}
    })

    async function sendMail(data){

        try {

            const {
                to, from, subject, text, html
            } = data

            const result = await transporter.sendMail({
                to,
                from,
                subject,
                text,
                html
            })

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    return {
        sendMail
    }

}
