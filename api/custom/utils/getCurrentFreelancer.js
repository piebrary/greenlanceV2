module.exports = async req => {

    const FreelancerModel = require('../../custom/models/freelancer')

    const freelancerDoc = await FreelancerModel
        .findOne({ user:req.user._id })

    return freelancerDoc

}
