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
        }

    }

    return {
        _id,
        username,
        firstName,
        lastName,
        email,
    }

}
