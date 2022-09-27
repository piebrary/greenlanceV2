module.exports = name => {

    if(name === undefined) return undefined

    const {
        first,
        last,
    } = name

    return {
        first,
        last,
    }

}
