const sanitize = require('mongo-sanitize')

module.exports = settings => {

    if(settings === undefined) return undefined

    const {
        _id,
        language,
        timeFormat,
        dateFormat
    } = sanitize(settings)

    return {
        _id,
        language,
        timeFormat,
        dateFormat
    }

}
