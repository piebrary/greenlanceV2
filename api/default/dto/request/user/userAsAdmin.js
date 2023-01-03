const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let emailRequestDto, settingsRequestDto

        try {
            emailRequestDto = require('../../../../custom/dto/response/email')
        } catch {
            emailRequestDto = require('../../../../default/dto/response/email')
        }

        try {
            settingsRequestDto = require('../../../../custom/dto/response/user/settings')
        } catch {
            settingsRequestDto = require('../../../../default/dto/response/user/settings')
        }

        try {
            profileRequestDto = require('../../../../custom/dto/response/user/profile')
        } catch {
            profileRequestDto = require('../../../../default/dto/response/user/profile')
        }

        const {
            _id,
            username,
            email,
            roles,
            settings,
            profile,
            password,
            newPassword,
            repeatPassword,
        } = sanitize(document)

        return {
            _id,
            username,
            email,
            roles,
            settings:settings && settingsRequestDto(settings),
            profile:profile && profileRequestDto(profile),
            password,
            newPassword,
            repeatPassword,
        }
    }

}
