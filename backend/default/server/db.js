const mongoose = require('mongoose')

module.exports = async () => {

    const composedURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`

    return mongoose.connect(composedURL, { useNewUrlParser: true })

}
