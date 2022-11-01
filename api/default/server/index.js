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
        const server = { express, db }

        express.use(Express.json())
        express.use(bodyParser.urlencoded({ extended: true }))
        express.use(cors())

        express.use('/public', Express.static(path.join(__dirname, '../../public')))
        express.use(Express.static(path.join(__dirname, 'frontend', 'build')))

        try {
            require('../../custom/server/auth.js')(server)
            require('../../default/server/auth.js')(server)
        } catch {
            require('../../default/server/auth.js')(server)
        }

        try {
            require('../../custom/server/routes/login')(server)
            require('../../default/server/routes/login')(server)
        } catch {
            require('../../default/server/routes/login')(server)
        }

        try {
            require('../../custom/server/routes/v1')(server)
            require('../../default/server/routes/v1')(server)
        } catch {
            require('../../default/server/routes/v1')(server)
        }

        try {
            require('../../custom/server/routes/v1/s/user')(server)
            require('../../default/server/routes/v1/s/user')(server)
        } catch {
            require('../../default/server/routes/v1/s/user')(server)
        }

        try {
            require('../../custom/server/routes/v1/s/roles')(server)
            require('../../default/server/routes/v1/s/roles')(server)
        } catch {
            require('../../default/server/routes/v1/s/roles')(server)
        }

        try {
            require('../../custom/server/routes/v1/s/event')(server)
            require('../../default/server/routes/v1/s/event')(server)
        } catch {
            require('../../default/server/routes/v1/s/event')(server)
        }

        try {
            require('../../custom/server/routes/v1/s/email')(server)
            require('../../default/server/routes/v1/s/email')(server)
        } catch {
            require('../../default/server/routes/v1/s/email')(server)
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
