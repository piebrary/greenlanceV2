module.exports = datetime => {

    if(datetime === undefined) return undefined

    const {
        start,
        end,
    } = datetime

    return {
        start,
        end,
    }

}
