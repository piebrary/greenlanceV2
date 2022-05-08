const sanitize = require('mongo-sanitize')

const settingsRequestDto = require('./settings')

module.exports = requestBody => {

    const {
        username,
        firstName,
        lastName,
        email,
        password,
        roles,
        settings,
        profilePicture,
        currentPassword,
        newPassword,
        repeatPassword,
    } = sanitize(requestBody)

    return {
        username,
        firstName,
        lastName,
        email,
        password,
        roles,
        settings:settingsRequestDto(settings),
        profilePicture,
        currentPassword,
        newPassword,
        repeatPassword,
    }

}
