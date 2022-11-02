const mongoose = require('mongoose')

module.exports = async () => {

    let composedURL

    if(process.env.environment === 'production'){

        composedURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}`

    }

    if(process.env.environment === 'development'){

        composedURL = `mongodb+srv://${process.env.DB_USERNAME_DEV}:${process.env.DB_PASSWORD_DEV}@${process.env.DB_URL_DEV}/${process.env.DB_NAME_DEV}`

    }

    return mongoose.connect(composedURL, { useNewUrlParser: true })

}
