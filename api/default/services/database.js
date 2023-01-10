module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let notFoundHandler, successHandler, errorHandler, UserModel, EventModel, MutationModel

    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { EventModel = require('../../custom/models/event') } catch { EventModel = require('../../default/models/event') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }

    return {
        getDatabaseCollections,
    }

    async function getDatabaseCollections(req){

        try {

            const collections = {}

            const users = await UserModel
                .find()

            collections.users = users

            const events = await EventModel
                .find()

            collections.events = events

            const mutations = await MutationModel
                .find()

            collections.mutations = mutations

            return successHandler(undefined, collections)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
