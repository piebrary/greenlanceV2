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
            name,
            freelancer,
            client,
            isSend,
            isPayed,
        } = document

        return {
            _id,
            name,
            freelancer,
            client,
            isSend,
            isPayed,
        }
    }

}
