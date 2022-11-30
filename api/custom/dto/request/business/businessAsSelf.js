const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            _id,
            name,
            description,
            labels,
            user,
        } = sanitize(document)

        return {
            _id,
            name,
            description,
            labels,
            user,
        }
    }

}
