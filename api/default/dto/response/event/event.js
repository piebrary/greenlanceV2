module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let datetimeResponseDto, locationResponseDto, recurringResponseDto

        try {
            datetimeResponseDto = require('../../../../custom/dto/response/datetime')
        } catch {
            datetimeResponseDto = require('../../../../default/dto/response/datetime')
        }

        try {
            locationResponseDto = require('../../../../custom/dto/response/location')
        } catch {
            locationResponseDto = require('../../../../default/dto/response/location')
        }

        try {
            recurringResponseDto = require('../../../../custom/dto/response/recurring')
        } catch {
            recurringResponseDto = require('../../../../default/dto/response/recurring')
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

}
