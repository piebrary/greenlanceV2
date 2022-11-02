module.exports = async req => {

    let UserModel

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }

    const userDoc = await UserModel
        .findOne({ _id:req.user._id })

    return userDoc

}
