const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        if(document === undefined) return {}

        // not in effect now

        const {
            start,
            end,
            interval
        } = sanitize(document)

        return {
            start,
            end,
            interval
        }
    }

}
