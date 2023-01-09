module.exports = documents => {

    if(Array.isArray(documents)){

        return documents.map(d => getDto(d))

    }

    return getDto(documents)

    function getDto(document){

        let profileResponseDto

        try {
            profileResponseDto = require('../../../../custom/dto/response/user/profile')
        } catch {
            profileResponseDto = require('../../../../default/dto/response/user/profile')
        }

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
