const sanitize = require('mongo-sanitize')

module.exports = requestBody => {

    let timeRequestDto, locationRequestDto, recurringRequestDto

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
        time:timeRequestDto(time),
        location:locationRequestDto(location),
        recurring:recurringRequestDto(recurring),
        rights,
        active
    }

}
