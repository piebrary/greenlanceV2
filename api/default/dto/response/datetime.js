module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            start,
            end,
        } = document

        return {
            start,
            end,
        }
    }

}
