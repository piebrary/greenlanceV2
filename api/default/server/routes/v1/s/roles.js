const passport = require('passport')

module.exports = async server => {

    const { express } = server

    let RolesService

    try {
        RolesService = require('../../../../../custom/services/roles')
    } catch {
        RolesService = require('../../../../../default/services/roles')
    }

    const rolesService = await RolesService(server)

    express.get(
        process.env.API_PREFIX + '/v1/s/roles',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await rolesService.getRoles(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

}
