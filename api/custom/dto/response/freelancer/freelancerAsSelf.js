module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            _id,
            users,
            description,
            name,
            labels,
            rating,
            reviews,
            connections,
            applied,
            enrolled,
            withdrawn,
            mutations,
        } = document

        return {
            _id,
            users,
            description,
            name,
            labels,
            rating,
            reviews,
            connections,
            applied,
            enrolled,
            withdrawn,
            mutations,
        }
    }

}
