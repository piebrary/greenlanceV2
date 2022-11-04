const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            label,
            number,
        } = sanitize(document)

        return {
            label,
            number,
        }
    }

}
