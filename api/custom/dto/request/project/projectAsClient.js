const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let datetimeRequestDto, locationRequestDto

        try {
            datetimeRequestDto = require('../../../../custom/dto/request/datetime')
        } catch {
            datetimeRequestDto = require('../../../../default/dto/request/datetime')
        }

        try {
            datetimeRequestDto = require('../../../../custom/dto/request/location')
        } catch {
            datetimeRequestDto = require('../../../../default/dto/request/location')
        }

        const {
            _id,
            name,
            description,
            label,
            datetime,
            location,
            creator,
            active,
            mutations,
        } = sanitize(document)

        return {
            _id,
            name,
            description,
            client,
            shifts,
            label,
            datetime:datetimeRequestDto(datetime),
            location:locationRequestDto(location),
            creator,
            active,
            mutations,
        }
    }

}
