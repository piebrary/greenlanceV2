const { Schema } = require('mongoose')

module.exports = new Schema({
    language: {
        type: String,
        default: 'en'
    },
    timeFormat: {
        type: String,
        default: 'HH:mm:ss'
    },
    dateFormat:{
        type: String,
        default: 'DD-MM-YYYY'
    },
})
