module.exports = document => {

    let nameRequestDto, emailRequestDto, phoneRequestDto, addressRequestDto, settingsRequestDto

    try {
        nameRequestDto = require('../../../../custom/dto/response/user/name')
    } catch {
        nameRequestDto = require('../../../../default/dto/response/user/name')
    }

    try {
        emailRequestDto = require('../../../../custom/dto/response/email')
    } catch {
        emailRequestDto = require('../../../../default/dto/response/email')
    }

    try {
        phoneRequestDto = require('../../../../custom/dto/response/phone')
    } catch {
        phoneRequestDto = require('../../../../default/dto/response/phone')
    }

    try {
        addressRequestDto = require('../../../../custom/dto/response/address')
    } catch {
        addressRequestDto = require('../../../../default/dto/response/address')
    }

    try {
        settingsRequestDto = require('../../../../custom/dto/response/user/settings')
    } catch {
        settingsRequestDto = require('../../../../default/dto/response/user/settings')
    }

    const {
        _id,
        username,
        name,
        email,
        emails,
        phone,
        address,
        roles,
        settings,
        profilePicture,
    } = document

    return {
        _id,
        username,
        name:nameRequestDto(name),
        email,
        phone,
        address,
        emails:emails && Array.isArray(emails) && emails.map(obj => emailRequestDto(obj)),
        phones:phone && Array.isArray(phone) && phone.map(obj => phoneRequestDto(obj)),
        addresses:address && Array.isArray(address) && address.map(obj => addressRequestDto(obj)),
        roles,
        settings:settings && settingsRequestDto(settings),
        profilePicture,
    }

}
