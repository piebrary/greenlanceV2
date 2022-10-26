module.exports = location => {

    if(location === undefined) return undefined

    let addressResponseDto

    try {
        addressResponseDto = require('../../../../custom/dto/response/address')
    } catch {
        addressResponseDto = require('../../../../default/dto/response/address')
    }

    const {
        start,
        end,
    } = location

    return {
        start:addressResponseDto(start),
        end:addressResponseDto(end),
    }

}
