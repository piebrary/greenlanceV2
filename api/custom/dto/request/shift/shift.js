const sanitize = require('mongo-sanitize')

module.exports = requestBody => {

    let datetimeRequestDto, locationRequestDto, recurringRequestDto

    try {
        datetimeRequestDto = require('../../../../custom/dto/request/event/datetime')
    } catch {
        datetimeRequestDto = require('../../../../default/dto/request/event/datetime')
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
        name,
        description,
        label,
        datetime,
        location,
        recurring,
        rights,
        active
    } = sanitize(requestBody)

    return {
        name,
        description,
        label,
        datetime:datetimeRequestDto(datetime),
        location:locationRequestDto(location),
        recurring:recurringRequestDto(recurring),
        rights,
        active
    }

}
