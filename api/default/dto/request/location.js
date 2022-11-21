const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let addressRequestDto

        try {
            addressRequestDto = require('../../../custom/dto/request/address')
        } catch {
            addressRequestDto = require('../../../default/dto/request/address')
        }

        const {
            start,
            end,
        } = sanitize(document)

        return {
            start:start && addressRequestDto(start),
            end:end && addressRequestDto(end),
        }
    }

}
