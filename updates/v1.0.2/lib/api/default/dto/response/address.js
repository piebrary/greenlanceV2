module.exports = data => {

    if(data === undefined) return undefined

    const {
        label,
        street,
        number,
        zipCode,
        city,
        province,
        country
    } = data

    return {
        label,
        street,
        number,
        zipCode,
        city,
        province,
        country
    }

}
