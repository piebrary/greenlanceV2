const settingsResponseDto = require('./settings')

module.exports = (document, user_id) => {

    const {
        _id,
        username,
        firstName,
        lastName,
        email,
        roles,
        settings,
        profilePicture,
    } = document

    if(_id.toString() === user_id){

        return {
            _id,
            username,
            firstName,
            lastName,
            email,
            roles,
            settings:settingsResponseDto(settings),
            profilePicture,
        }

    }

    return {
        _id,
        username,
        firstName,
        lastName,
        email,
        profilePicture,
    }

}
