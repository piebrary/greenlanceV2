const Express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')

const serverConfig = require('../../../config/server')
const dbConfig = require('../../../config/db')

const logger = require('../utils/logger')

module.exports = async () => {

    try {

        const db = await require('./db.js')(dbConfig)

        const port = serverConfig.PORT
        const express = Express()

        express.use(Express.json())
        express.use(bodyParser.urlencoded({ extended: true }))
        express.use(cors())

        require('./auth.js')(serverConfig)

        require('./routes/login')(express, serverConfig)
        require('./routes/v1')(express, serverConfig)
        require('./routes/v1/s/user')(express, serverConfig)
        require('./routes/v1/s/event')(express, serverConfig)

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
