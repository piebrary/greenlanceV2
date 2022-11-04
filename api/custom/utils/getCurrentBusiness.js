module.exports = async req => {

    const BusinessModel = require('../../custom/models/business')

    const businessDoc = await BusinessModel
        .findOne({ users:req.user._id })

    return businessDoc

}
