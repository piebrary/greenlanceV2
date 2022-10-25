const sanitize = require('mongo-sanitize')

module.exports = name => {

    if(name === undefined) return undefined

    const {
        first,
        last,
    } = sanitize(name)

    return {
        first,
        last,
    }

}
