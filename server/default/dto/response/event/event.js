module.exports = document => {

    let dateResponseDto, timeResponseDto, locationResponseDto, recurringResponseDto

    try {
        dateResponseDto = require('../../../../custom/dto/response/event/date')
    } catch {
        dateResponseDto = require('../../../../default/dto/response/event/date')
    }

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
        date,
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
        date:dateResponseDto(date),
        time:timeResponseDto(time),
        location:locationResponseDto(location),
        recurring:recurringResponseDto(recurring),
        active
    }

}
