const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        try {
            datetimeRequestDto = require('../../../../custom/dto/request/datetime')
        } catch {
            datetimeRequestDto = require('../../../../default/dto/request/datetime')
        }

        const {
            _id,
            shift,
            freelancer,
            planned,
            actual,
        } = sanitize(document)

        return {
            _id,
            shift,
            freelancer,
            planned:planned && datetimeRequestDto(planned),
            actual:{
                freelancer:actual?.freelancer && datetimeRequestDto(actual?.freelancer),
                client:actual?.client && datetimeRequestDto(actual?.client),
            }
        }
    }

}
