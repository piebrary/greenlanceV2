module.exports = settings => {

    if(settings === undefined) return undefined

    const {
        language,
    } = settings

    return {
        language,
    }

}
