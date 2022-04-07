module.exports = (() => {

    const port = 46372
    const secret = 'secret'
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
