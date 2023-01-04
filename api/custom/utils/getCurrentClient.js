module.exports = async req => {

    const ClientModel = require('../../custom/models/client')

    const clientDoc = await ClientModel
        .findOne({ users:req.user._id })

    return clientDoc

}
