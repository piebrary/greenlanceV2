module.exports = (status, body) => {

    status = status === undefined && body === undefined ? 204 : 200

    return {
        status: status,
        body: body
    }

}
