module.exports = document => {

    let timeResponseDto, locationResponseDto, recurringResponseDto

    try {
        timeResponseDto = require('../../../../custom/dto/response/event/time')
    } catch {
        timeResponseDto = require('../../../../default/dto/response/event/time')
    }

    try {
        locationResponseDto = require('../../../../custom/dto/response/event/location')
    } catch {
        locationResponseDto = require('../../../../default/dto/response/event/location')
    }

    try {
        recurringResponseDto = require('../../../../custom/dto/response/event/recurring')
    } catch {
        recurringResponseDto = require('../../../../default/dto/response/event/recurring')
    }

    const {
        _id,
        title,
        body,
        category,
        time,
        location,
        recurring,
        active
    } = document

    return {
        _id,
        title,
        body,
        category,
        time:timeResponseDto(time),
        location:locationResponseDto(location),
        recurring:recurringResponseDto(recurring),
        active
    }

}
