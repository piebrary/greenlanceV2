module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            _id,
            name,
            users,
            description,
            labels,
            rating,
            reviews,
            freelancers,
            mutations,
        } = document

        return {
            _id,
            name,
            users,
            description,
            labels,
            rating,
            reviews,
            freelancers,
            mutations,
        }
    }

}
