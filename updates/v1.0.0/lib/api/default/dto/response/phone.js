module.exports = data => {

    if(data === undefined) return undefined

    const {
        label,
        number,
    } = data

    return {
        label,
        number,
    }

}
