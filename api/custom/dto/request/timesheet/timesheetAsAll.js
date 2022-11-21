const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        try {
            datetimeRequestDto = require('../../../../custom/dto/response/datetime')
        } catch {
            datetimeRequestDto = require('../../../../default/dto/response/datetime')
        }

        const {
            freelancerId,
            planned,
            freelancer,
            business,
        } = sanitize(document)

        return {
            freelancerId,
            planned:planned && datetimeRequestDto(planned),
            freelancer:freelancer && datetimeRequestDto(freelancer),
            business:business && datetimeRequestDto(business),
        }
    }

}
