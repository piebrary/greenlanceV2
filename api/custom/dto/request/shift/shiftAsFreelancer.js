const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let datetimeRequestDto, locationRequestDto, recurringRequestDto

        try {
            datetimeRequestDto = require('../../../../custom/dto/request/datetime')
        } catch {
            datetimeRequestDto = require('../../../../default/dto/request/datetime')
        }

        try {
            locationRequestDto = require('../../../../custom/dto/request/location')
        } catch {
            locationRequestDto = require('../../../../default/dto/request/location')
        }

        try {
            recurringRequestDto = require('../../../../custom/dto/request/recurring')
        } catch {
            recurringRequestDto = require('../../../../default/dto/request/recurring')
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

}
