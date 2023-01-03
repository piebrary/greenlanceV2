module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let emailResponseDto, settingsResponseDto, profileResponseDto

        try {
            emailResponseDto = require('../../../../custom/dto/response/email')
        } catch {
            emailResponseDto = require('../../../../default/dto/response/email')
        }

        try {
            settingsResponseDto = require('../../../../custom/dto/response/user/settings')
        } catch {
            settingsResponseDto = require('../../../../default/dto/response/user/settings')
        }

        try {
            profileResponseDto = require('../../../../custom/dto/response/user/profile')
        } catch {
            profileResponseDto = require('../../../../default/dto/response/user/profile')
        }

        const {
            _id,
            username,
            email,
            roles,
            settings,
            profile,
        } = document

        return {
            _id,
            username,
            email,
            roles,
            settings:settings && settingsResponseDto(settings),
            profile:profile && profileResponseDto(profile),
        }
    }

}
