const { Schema } = require('mongoose')

module.exports = new Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        dropDups: true,
        required: true,
    },
    passwordHash: {       //salted and hashed using bcrypt
        type: String,
        required: true,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    roles: {              // user can have multiple roles, therefor use an array
        type: Array,
        required: true,
    },
    settings: {
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
            default: 'DD-MM-yyyy'
        },
    }
},
{
    timestamps: true
})
