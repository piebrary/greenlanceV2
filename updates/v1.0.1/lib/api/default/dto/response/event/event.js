module.exports = document => {

    let datetimeResponseDto, locationResponseDto, recurringResponseDto

    try {
        datetimeResponseDto = require('../../../../custom/dto/response/event/datetime')
    } catch {
        datetimeResponseDto = require('../../../../default/dto/response/event/datetime')
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
        name,
        description,
        label,
        datetime,
        location,
        recurring,
        active
    } = document

    return {
        _id,
        name,
        description,
        label,
        datetime:datetimeResponseDto(datetime),
        location:locationResponseDto(location),
        recurring:recurringResponseDto(recurring),
        active
    }

}
