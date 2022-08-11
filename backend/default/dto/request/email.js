const sanitize = require('mongo-sanitize')

module.exports = data => {

    if(data === undefined) return undefined

    const {
        label,
        email,
    } = sanitize(data)

    return {
        label,
        email,
    }

}
