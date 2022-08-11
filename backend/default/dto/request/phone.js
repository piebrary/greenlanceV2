const sanitize = require('mongo-sanitize')

module.exports = data => {

    if(data === undefined) return undefined

    const {
        label,
        number,
    } = sanitize(data)

    return {
        label,
        number,
    }

}
