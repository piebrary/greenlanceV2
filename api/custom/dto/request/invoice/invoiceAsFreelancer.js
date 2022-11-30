const sanitize = require('mongo-sanitize')

module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            _id,
            business,
            businessName,
            timesheets,
        } = sanitize(document)

        return {
            _id,
            business,
            businessName,
            timesheets,
        }
    }

}
