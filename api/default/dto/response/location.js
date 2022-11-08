module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document = {}){

        let addressResponseDto

        try {
            addressResponseDto = require('../../../custom/dto/response/address')
        } catch {
            addressResponseDto = require('../../../default/dto/response/address')
        }

        const {
            start,
            end,
        } = document

        return {
            start:addressResponseDto(start),
            end:addressResponseDto(end),
        }
    }

}
