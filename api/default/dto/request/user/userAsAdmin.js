const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let emailRequestDto, settingsRequestDto

        try {
            emailRequestDto = require('../../../../custom/dto/request/email')
        } catch {
            emailRequestDto = require('../../../../default/dto/request/email')
        }

        try {
            settingsRequestDto = require('../../../../custom/dto/request/user/settings')
        } catch {
            settingsRequestDto = require('../../../../default/dto/request/user/settings')
        }

        try {
            profileRequestDto = require('../../../../custom/dto/request/user/profile')
        } catch {
            profileRequestDto = require('../../../../default/dto/request/user/profile')
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
