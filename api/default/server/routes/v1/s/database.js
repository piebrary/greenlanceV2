const passport = require('passport')

module.exports = async server => {

    const { express } = server

    let DatabaseService

    try {
        DatabaseService = require('../../../../../custom/services/database')
    } catch {
        DatabaseService = require('../../../../../default/services/database')
    }

    const databaseService = await DatabaseService(server)

    express.get(
        process.env.API_PREFIX + '/v1/s/database/collections',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await databaseService.getDatabaseCollections(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

}
