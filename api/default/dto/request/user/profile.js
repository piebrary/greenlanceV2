const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        try {
            nameRequestDto = require('../../../../custom/dto/request/name')
        } catch {
            nameRequestDto = require('../../../../default/dto/request/name')
        }

        const {
            _id,
            username,
            picture,
        } = sanitize(document)

        return {
            _id,
            username,
            name:name && nameRequestDto(name),
            picture,
            emails:emails && Array.isArray(emails) && emails.map(obj => emailRequestDto(obj)),
            phones:phones && Array.isArray(phones) && phones.map(obj => phoneRequestDto(obj)),
            addresses:addresses && Array.isArray(addresses) && addresses.map(obj => addressRequestDto(obj)),
        }
    }

}
