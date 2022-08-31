const sanitize = require('mongo-sanitize')

module.exports = date => {

    if(date === undefined) return undefined

    const {
        from,
        until,
    } = sanitize(date)

    return {
        from,
        until,
    }

}
