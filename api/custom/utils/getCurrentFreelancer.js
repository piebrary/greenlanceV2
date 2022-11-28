module.exports = async req => {

    const FreelancerModel = require('../../custom/models/freelancer')

    const freelancerDoc = await FreelancerModel
        .findOne({ users:req.user._id })

    return freelancerDoc

}
