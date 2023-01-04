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
            _id,
            shift,
            freelancer,
            planned,
            actualByFreelancer,
            actualByClient,
            status,
        } = document

        console.log(document)

        return {
            _id,
            shift,
            freelancer,
            planned:planned && datetimeRequestDto(planned),
            actualByFreelancer:actualByFreelancer && datetimeRequestDto(actualByFreelancer),
            actualByClient:actualByClient && datetimeRequestDto(actualByClient),
            status,
        }
    }

}
