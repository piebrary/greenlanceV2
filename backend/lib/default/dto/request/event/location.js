const sanitize = require('mongo-sanitize')

module.exports = location => {

    if(location === undefined) return undefined

    let addressRequestDto

    try {
        addressRequestDto = require('../../../../custom/dto/request/address')
    } catch {
        addressRequestDto = require('../../../../default/dto/request/address')
    }

    const {
        start,
        end,
    } = sanitize(location)

    return {
        start:addressRequestDto(start),
        end:addressRequestDto(end),
    }

}
