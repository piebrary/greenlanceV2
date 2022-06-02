let serverInfoService

module.exports = (express, config) => {

    try { serverInfoService = require('../../../../custom/services/serverInfo') } catch { serverInfoService = require('../../../services/serverInfo') }

    const prefix = config.PREFIX

    express.get(prefix + '/status', async (req, res) => {

        const serverInfo = await serverInfoService()

        res
            .status(serverInfo.status)
            .send(serverInfo.message)

    })

}
