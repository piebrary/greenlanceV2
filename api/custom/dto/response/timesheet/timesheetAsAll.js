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
        } = document

        return {
            freelancerId,
            planned:planned.toObject() && datetimeRequestDto(planned),
            freelancer:freelancer.toObject() && datetimeRequestDto(freelancer),
            business:business.toObject() && datetimeRequestDto(business),
        }
    }

}
