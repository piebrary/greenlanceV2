const sanitize = require('mongo-sanitize')

module.exports = recurring => {

    if(recurring === undefined) return undefined

    const {
        interval,
        until,
    } = sanitize(recurring)

    return {
        interval,
        until,
    }

}
