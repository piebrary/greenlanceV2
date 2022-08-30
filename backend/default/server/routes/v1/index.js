let serverInfoService

module.exports = express => {

    try {
        serverInfoService = require('../../../../custom/services/serverInfo')
    } catch {
        serverInfoService = require('../../../../default/services/serverInfo')
    }

    express.get(process.env.API_PREFIX + '/v1/status', async (req, res) => {

        const serverInfo = await serverInfoService()

        res
            .status(serverInfo.status)
            .send(serverInfo.body)

    })

}
