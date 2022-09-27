const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const path = require('path')

module.exports = async () => {

    let logger, db

    try {

        try {
            logger = require('../../custom/utils/logger')()
        } catch {
            logger = require('../../default/utils/logger')
        }

        try {
            db = await require('../../custom/server/db.js')()
        } catch {
            db = await require('../../default/server/db.js')()
        }

        const express = Express()

        express.use(Express.json())
        express.use(bodyParser.urlencoded({ extended: true }))
        express.use(cors())

        express.use('/public', Express.static(path.join(__dirname, '../../public')))
        express.use(Express.static(path.join(__dirname, 'frontend', 'build')))

        try {
            require('../../custom/server/auth.js')()
            require('../../default/server/auth.js')()
        } catch {
            require('../../default/server/auth.js')()
        }

        try {
            require('../../custom/server/routes/login')(express)
            require('../../default/server/routes/login')(express)
        } catch {
            require('../../default/server/routes/login')(express)
        }

        try {
            require('../../custom/server/routes/v1')(express)
            require('../../default/server/routes/v1')(express)
        } catch {
            require('../../default/server/routes/v1')(express)
        }

        try {
            require('../../custom/server/routes/v1/s/user')(express)
            require('../../default/server/routes/v1/s/user')(express)
        } catch {
            require('../../default/server/routes/v1/s/user')(express)
        }

        try {
            require('../../custom/server/routes/v1/s/event')(express)
            require('../../default/server/routes/v1/s/event')(express)
        } catch {
            require('../../default/server/routes/v1/s/event')(express)
        }

        try {
            require('../../custom/server/routes/v1/s/email')(express)
            require('../../default/server/routes/v1/s/email')(express)
        } catch {
            require('../../default/server/routes/v1/s/email')(express)
        }

        express.listen(
            process.env.API_PORT,
            () => {

                logger.log({
                    message:`Express server listening on port ${process.env.API_PORT}.`
                })

                logger.log({
                    message:`Started @ ${moment()}`
                })
            }
        )

    } catch (error) {

        logger.error({
            message:'New Error',
            data:error
        })

    }

}
