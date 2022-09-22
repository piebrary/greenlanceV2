const axios = require('axios')
const moment = require('moment')

require('dotenv').config({ path:'../../.env' })

const url = `http://localhost:${process.env.API_PORT}${process.env.API_PREFIX}`

module.exports = (async () => {

    let UserModel, EventModel, encryptPassword, db

    try {

        if(process.env.NODE_ENV !== 'development'){

            console.log('Can not clear db due to env ENVIRONMENT not being set to \'development\'')

            process.exit()

        }

        try {
            UserModel = require('../../custom/models/user')
        } catch {
            UserModel = require('../../default/models/user')
        }

        try {
            EventModel = require('../../custom/models/event')
        } catch {
            EventModel = require('../../default/models/event')
        }

        try {
            encryptPassword = require('../../custom/utils/encryptPassword')
        } catch {
            encryptPassword = require('../../default/utils/encryptPassword')
        }

        try {
            db = await require('../../custom/server/db.js')()
        } catch {
            db = await require('../../default/server/db.js')()
        }

        await UserModel.collection?.dropIndexes()
        await UserModel.collection?.drop()

        await EventModel.collection?.dropIndexes()
        await EventModel.collection?.drop()

        console.log('Finished dropping collections')

    } catch (error) {

        console.log('==== NEW ERROR ====')

        if(
            error.request
            && error.response
            && error.config
        ){

            console.log('- request.path', error.request?.path)
            console.log('- response.statusText', error.response?.statusText)
            console.log('- response.status', error.response?.status)
            console.log('- request.method', error.request?.method)
            console.log('- config.data', error.config?.data)
            console.log('- response.data', error.response?.data)

            return

        }

        console.log(error)

    }

    process.exit()

})()
