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
        currentPassword,
        newPassword
    } = sanitize(requestBody)

    return {
        username,
        firstName,
        lastName,
        email,
        password,
        roles,
        settings:settingsRequestDto(settings),
        currentPassword,
        newPassword
    }

}
