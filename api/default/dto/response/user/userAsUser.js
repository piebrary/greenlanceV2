module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        const {
            _id,
            username,
            profile,
        } = document

        return {
            _id,
            username,
            profile:profile && profileResponseDto(profile),
        }
    }

}
