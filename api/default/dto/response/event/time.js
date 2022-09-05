module.exports = time => {

    if(time === undefined) return undefined

    const {
        from,
        until,
    } = time

    return {
        from,
        until,
    }

}
