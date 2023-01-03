const sanitize = require('mongo-sanitize')

module.exports = documents => {

    console.log('test')

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let emailRequestDto, settingsRequestDto, profileRequestDto

        try {
            emailRequestDto = require('../../../../custom/dto/response/email')
        } catch {
            emailRequestDto = require('../../../../default/dto/response/email')
        }

        try {
            profileRequestDto = require('../../../../custom/dto/response/user/profile')
        } catch {
            profileRequestDto = require('../../../../default/dto/response/user/profile')
        }

        try {
            settingsRequestDto = require('../../../../custom/dto/response/user/settings')
        } catch {
            settingsRequestDto = require('../../../../default/dto/response/user/settings')
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
