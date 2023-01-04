const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let datetimeRequestDto, locationRequestDto

        try {
            datetimeRequestDto = require('../../../../custom/dto/response/datetime')
        } catch {
            datetimeRequestDto = require('../../../../default/dto/response/datetime')
        }

        try {
            datetimeRequestDto = require('../../../../custom/dto/response/location')
        } catch {
            datetimeRequestDto = require('../../../../default/dto/response/location')
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
