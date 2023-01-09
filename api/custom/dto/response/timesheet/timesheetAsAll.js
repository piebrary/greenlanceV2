module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        try {
            datetimeResponseDto = require('../../../../custom/dto/response/datetime')
        } catch {
            datetimeResponseDto = require('../../../../default/dto/response/datetime')
        }

        const {
            _id,
            shift,
            freelancer,
            planned,
            actual,
            status,
        } = document

        return {
            _id,
            shift,
            freelancer,
            planned:planned && datetimeResponseDto(planned),
            actual:{
                freelancer:actual?.freelancer && datetimeResponseDto(actual?.freelancer),
                client:actual?.client && datetimeResponseDto(actual?.client),
            },
            status,
        }
    }

}
