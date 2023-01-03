module.exports = profile => {

    if(profile === undefined) return undefined

    const {
        name,
        email,
        emails,
        phones,
        addresses,
        picture,
    } = profile

    let nameResponseDto, emailResponseDto, phoneResponseDto, addressResponseDto

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

    return {
        name:name && nameResponseDto(name),
        email,
        emails:emails && Array.isArray(emails) && emails.map(obj => emailResponseDto(obj)),
        phones:phones && Array.isArray(phones) && phones.map(obj => phoneResponseDto(obj)),
        addresses:addresses && Array.isArray(addresses) && addresses.map(obj => addressResponseDto(obj)),
        picture,
    }

}
