module.exports = (() => {

    const port = 31415
    const secret = 'u2htgf98hjtfir3wgni093h0rgi03ng03hg003490gj03'
    const expiresIn = (1000 * 60 * 60 * 24 * 31)
    const prefix = '/api'
    const mode = 'DEV'
    const dateFormat = 'DD-MM-YYYY'
    const timeFormat = 'HH:mm:ss'

    return {
        PORT:port,
        SECRET:secret,
        EXPIRES_IN:expiresIn,
        PREFIX:prefix,
        MODE:mode,
        DATE_FORMAT:dateFormat,
        TIME_FORMAT:timeFormat,
        DATE_TIME_FORMAT:dateFormat + ' ' + timeFormat,
    }

})()
