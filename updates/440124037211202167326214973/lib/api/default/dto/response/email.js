module.exports = data => {

    if(data === undefined) return undefined

    const {
        label,
        email,
    } = data

    return {
        label,
        email,
    }

}
