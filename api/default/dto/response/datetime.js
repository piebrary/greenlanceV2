module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document = {}){

        const {
            start,
            end,
        } = document

        return {
            start:new Date(start).toISOString().replace('Z', ''),
            end:new Date(end).toISOString().replace('Z', ''),
        }
    }

}
