module.exports = recurring => {

    if(recurring === undefined) return undefined

    const {
        interval,
        until,
    } = recurring

    return {
        interval,
        until,
    }

}
