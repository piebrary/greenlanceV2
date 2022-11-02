const sanitize = require('mongo-sanitize')

module.exports = datetime => {

    if(datetime === undefined) return undefined

    const {
        start,
        end,
    } = sanitize(datetime)

    return {
        start,
        end,
    }

}
