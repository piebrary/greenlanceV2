const sanitize = require('mongo-sanitize')

module.exports = settings => {

    if(settings === undefined) return undefined

    const {
        _id,
        language,
    } = sanitize(settings)

    return {
        _id,
        language,
    }

}
