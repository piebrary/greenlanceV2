const sanitize = require('mongo-sanitize')

let settingsRequestDto

try { settingsRequestDto = require('../../../custom/dto/request/settings') } catch { settingsRequestDto = require('./settings') }

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
