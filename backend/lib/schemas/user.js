const { Schema } = require('mongoose')

const settingsSchema = require('./settings')

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
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roles: {              // user can have multiple roles, therefor use an array
        type: Array,
        required: true,
    },
    settings: new Schema(settingsSchema)
},
{
    timestamps: true
})
