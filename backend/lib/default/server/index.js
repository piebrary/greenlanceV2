const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
const path = require('path')

const serverConfig = require('../../../../config/server')
const dbConfig = require('../../../../config/db')

module.exports = async () => {

    let logger, db

    try {

        try {
            logger = require('../../custom/utils/logger')(serverConfig)
        } catch {
            logger = require('../../default/utils/logger')
        }

        try {
            db = await require('../../custom/server/db.js')(dbConfig)
        } catch {
            db = await require('../../default/server/db.js')(dbConfig)
        }

        const port = serverConfig.PORT
        const express = Express()

        express.use(Express.json())
        express.use(bodyParser.urlencoded({ extended: true }))
        express.use(cors())

        express.use('/public', Express.static(path.join(__dirname, '../../../public')))
        express.use(Express.static(path.join(__dirname, 'frontend', 'build')))

        express.get('/', (req, res) => {

            res.sendFile(path.join(__dirname, '../../../../', 'frontend', 'piebrary', 'public', 'index.html'))

        })

        try {
            require('../../custom/server/auth.js')(serverConfig)
            require('../../default/server/auth.js')(serverConfig)
        } catch {
            require('../../default/server/auth.js')(serverConfig)
        }

        try {
            require('../../custom/server/routes/login')(express, serverConfig)
            require('../../default/server/routes/login')(express, serverConfig)
        } catch {
            require('../../default/server/routes/login')(express, serverConfig)
        }

        try {
            require('../../custom/server/routes/v1')(express, serverConfig)
            require('../../default/server/routes/v1')(express, serverConfig)
        } catch {
            require('../../default/server/routes/v1')(express, serverConfig)
        }

        try {
            require('../../custom/server/routes/v1/s/user')(express, serverConfig)
            require('../../default/server/routes/v1/s/user')(express, serverConfig)
        } catch {
            require('../../default/server/routes/v1/s/user')(express, serverConfig)
        }

        try {
            require('../../custom/server/routes/v1/s/event')(express, serverConfig)
            require('../../default/server/routes/v1/s/event')(express, serverConfig)
        } catch {
            require('../../default/server/routes/v1/s/event')(express, serverConfig)
        }

        express.listen(
            port,
            () => {

                logger.log({
                    message:`Express server listening on port ${port}.`
                })

                logger.log({
                    message:`Started @ ${moment().format(serverConfig.DATE_TIME_FORMAT)}`
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
