module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            _id,
            user,
            description,
            labels,
            rating,
            reviews,
            businesses,
            applied,
            enrolled,
            withdrawn,
            mutations,
        } = document

        return {
            _id,
            user,
            description,
            labels,
            rating,
            reviews,
            businesses,
            applied,
            enrolled,
            withdrawn,
            mutations,
        }
    }

}
