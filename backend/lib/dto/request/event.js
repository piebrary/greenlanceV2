const sanitize = require('mongo-sanitize')

module.exports = requestBody => {

    const {
        title,
        body,
        time,
        creator,
        active
    } = sanitize(requestBody)

    return {
        title,
        body,
        time,
        creator,
        active
    }

}
