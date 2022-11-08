module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document = {}){

        const {
            label,
            street,
            number,
            zipCode,
            city,
            province,
            country
        } = document

        return {
            label,
            street,
            number,
            zipCode,
            city,
            province,
            country
        }

    }

}
