module.exports = date => {

    if(date === undefined) return undefined

    const {
        from,
        until,
    } = date

    return {
        from,
        until,
    }

}
