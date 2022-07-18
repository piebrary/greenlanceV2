let serverInfoService

module.exports = (express, config) => {

    try {
        serverInfoService = require('../../../../custom/services/serverInfo')
    } catch {
        serverInfoService = require('../../../../default/services/serverInfo')
    }

    const prefix = config.PREFIX

    express.get(prefix + '/v1/status', async (req, res) => {

        const serverInfo = await serverInfoService()

        res
            .status(serverInfo.status)
            .send(serverInfo.body)

    })

}
