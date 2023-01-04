const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            _id,
            client,
            clientName,
            timesheets,
        } = sanitize(document)

        return {
            _id,
            client,
            clientName,
            timesheets,
        }
    }

}
