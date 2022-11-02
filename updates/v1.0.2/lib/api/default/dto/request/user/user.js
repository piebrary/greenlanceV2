const sanitize = require('mongo-sanitize')

module.exports = requestBody => {

    let nameRequestDto, emailRequestDto, phoneRequestDto, addressRequestDto, settingsRequestDto

    try {
        nameRequestDto = require('../../../../custom/dto/request/user/name')
    } catch {
        nameRequestDto = require('../../../../default/dto/request/user/name')
    }

    try {
        emailRequestDto = require('../../../../custom/dto/request/email')
    } catch {
        emailRequestDto = require('../../../../default/dto/request/email')
    }

    try {
        phoneRequestDto = require('../../../../custom/dto/request/phone')
    } catch {
        phoneRequestDto = require('../../../../default/dto/request/phone')
    }

    try {
        addressRequestDto = require('../../../../custom/dto/request/address')
    } catch {
        addressRequestDto = require('../../../../default/dto/request/address')
    }

    try {
        settingsRequestDto = require('../../../../custom/dto/request/user/settings')
    } catch {
        settingsRequestDto = require('../../../../default/dto/request/user/settings')
    }

    const {
        username,
        name,
        email,
        phone,
        address,
        emails,
        phones,
        addresses,
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
        name:nameRequestDto(name),
        email,
        phone,
        address,
        emails:emails && Array.isArray(emails) && emails.map(obj => emailRequestDto(obj)),
        phones:phones && Array.isArray(phones) && phones.map(obj => phoneRequestDto(obj)),
        addresses:addresses && Array.isArray(addresses) && addresses.map(obj => addressRequestDto(obj)),
        password,
        roles,
        settings:settings && settingsRequestDto(settings),
        profilePicture,
        currentPassword,
        newPassword,
        repeatPassword,
    }

}
