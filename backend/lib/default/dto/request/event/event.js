const sanitize = require('mongo-sanitize')

module.exports = requestBody => {

    let dateRequestDto, timeRequestDto, locationRequestDto, recurringRequestDto

    try {
        dateRequestDto = require('../../../../custom/dto/request/event/date')
    } catch {
        dateRequestDto = require('../../../../default/dto/request/event/date')
    }

    try {
        timeRequestDto = require('../../../../custom/dto/request/event/time')
    } catch {
        timeRequestDto = require('../../../../default/dto/request/event/time')
    }

    try {
        locationRequestDto = require('../../../../custom/dto/request/event/location')
    } catch {
        locationRequestDto = require('../../../../default/dto/request/event/location')
    }

    try {
        recurringRequestDto = require('../../../../custom/dto/request/event/recurring')
    } catch {
        recurringRequestDto = require('../../../../default/dto/request/event/recurring')
    }

    const {
        title,
        body,
        category,
        date,
        time,
        location,
        recurring,
        rights,
        active
    } = sanitize(requestBody)

    return {
        title,
        body,
        category,
        date:dateRequestDto(date),
        time:timeRequestDto(time),
        location:locationRequestDto(location),
        recurring:recurringRequestDto(recurring),
        rights,
        active
    }

}
