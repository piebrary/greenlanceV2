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
            locationRequestDto = require('../../../../custom/dto/response/location')
        } catch {
            locationRequestDto = require('../../../../default/dto/response/location')
        }

        const {
            _id,
            name,
            description,
            business,
            shifts,
            label,
            datetime,
            location,
            creator,
            active,
            mutations,
        } = document

        return {
            _id,
            name,
            description,
            business,
            shifts,
            label,
            datetime:datetime && datetimeRequestDto(datetime),
            location:location && locationRequestDto(location),
            creator,
            active,
            mutations,
        }
    }

}
