module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            _id,
            subject,
            reviewer,
            rating,
            comment,
        } = document

        return {
            _id,
            subject,
            reviewer,
            rating,
            comment,
        }
    }

}
