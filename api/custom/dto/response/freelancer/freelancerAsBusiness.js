module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            _id,
            description,
            name,
            rating,
            reviews,
        } = document

        return {
            _id,
            description,
            name,
            rating,
            reviews,
        }
    }

}
