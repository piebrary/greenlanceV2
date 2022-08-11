module.exports = resource => {

    return {
        status:404,
        body:resource
            ? 'Resource not found: ' + resource
            : 'Resource not found'
    }

}
