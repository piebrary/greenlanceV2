module.exports = () => {

    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }

    return successHandler(undefined, 'Server is online')

}
