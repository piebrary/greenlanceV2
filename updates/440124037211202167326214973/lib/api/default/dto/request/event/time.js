const sanitize = require('mongo-sanitize')

module.exports = time => {

    if(time === undefined) return undefined

    const {
        from,
        until,
    } = sanitize(time)

    return {
        from,
        until,
    }

}
