module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let nameResponseDto, emailResponseDto, settingsResponseDto, profileResponseDto

        try {
            nameResponseDto = require('../../../../custom/dto/response/name')
        } catch {
            nameResponseDto = require('../../../../default/dto/response/name')
        }

        try {
            emailResponseDto = require('../../../../custom/dto/response/email')
        } catch {
            emailResponseDto = require('../../../../default/dto/response/email')
        }

        try {
            phoneResponseDto = require('../../../../custom/dto/response/phone')
        } catch {
            phoneResponseDto = require('../../../../default/dto/response/phone')
        }

        try {
            addressResponseDto = require('../../../../custom/dto/response/address')
        } catch {
            addressResponseDto = require('../../../../default/dto/response/address')
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
