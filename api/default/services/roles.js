module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let notFoundHandler, successHandler, errorHandler, roles

    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { roles = require('../../custom/assets/roles') } catch { roles = require('../../default/assets/roles') }

    return {
        getRoles,
    }

    async function getRoles(req){

        try {

            return successHandler(undefined, roles)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
