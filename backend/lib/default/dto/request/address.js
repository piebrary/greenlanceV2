const sanitize = require('mongo-sanitize')

module.exports = data => {

    if(data === undefined) return undefined

    const {
        label,
        street,
        number,
        zipCode,
        city,
        province,
        country
    } = sanitize(data)

    return {
        label,
        street,
        number,
        zipCode,
        city,
        province,
        country
    }

}
