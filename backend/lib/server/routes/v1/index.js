const serverInfoService = require('../../../services/serverInfo')

module.exports = (express, config) => {

    const prefix = config.PREFIX

    express.get(prefix + '/status', async (req, res) => {

        const serverInfo = await serverInfoService()

        res
            .status(serverInfo.status)
            .send(serverInfo.message)

    })

}
