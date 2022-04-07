const mongoose = require('mongoose')

module.exports = async config => {

    return mongoose.connect(config.URL, { useNewUrlParser: true })

}
