const sanitize = require('mongo-sanitize')

module.exports = requestBody => {

    let nameRequestDto, emailsRequestDto, phoneRequestDto, addressRequestDto, settingsRequestDto

    try {
        nameRequestDto = require('../../../../custom/dto/request/user/name')
    } catch {
        nameRequestDto = require('../../../../default/dto/request/user/name')
    }

    try {
        emailRequestDto = require('../../../../custom/dto/request/emails')
    } catch {
        emailRequestDto = require('../../../../default/dto/request/emails')
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
        emails,
        phone,
        address,
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
        emails:emails && Array.isArray(emails) && emails.map(obj => emailsRequestDto(obj)),
        phone:phone && Array.isArray(phone) && phone.map(obj => phoneRequestDto(obj)),
        address:address && Array.isArray(address) && address.map(obj => addressRequestDto(obj)),
        password,
        roles,
        settings:settings && settingsRequestDto(settings),
        profilePicture,
        currentPassword,
        newPassword,
        repeatPassword,
    }

}
