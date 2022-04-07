const sanitize = require('mongo-sanitize')

module.exports = requestBody => {

    const {
        title,
        body,
        time
    } = sanitize(requestBody)

    return {
        title,
        body,
        time
    }

}
