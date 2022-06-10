module.exports = settings => {

    if(settings === undefined) return undefined

    const {
        language,
        timeFormat,
        dateFormat
    } = settings

    return {
        language,
        timeFormat,
        dateFormat
    }

}
