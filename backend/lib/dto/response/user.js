const settingsResponseDto = require('./settings')

module.exports = (document, completeEntityData = false) => {

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

    if(completeEntityData){

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
