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
    profilePicture: {
        type: String
    },
    roles: {              // user can have multiple roles, therefor use an array
        type: Array,
        required: true,
    },
    name: {
        first: {
            type: String
        },
        last: {
            type: String
        }
    },
    email: [
        {
            label: {
                type: String
            },
            email: {
                type: String
            }
        }
    ],
    phone: [
        {
            label: {
                type: String
            },
            number: {
                type: String
            }
        }
    ],
    address: [
        {
            label: {
                type: String
            },
            street: {
                type: String
            },
            number: {
                type: String
            },
            zipCode: {
                type: String
            },
            city: {
                type: String
            },
            province: {
                type: String
            },
            country: {
                type: String
            },
        }
    ],
    settings: {
        language: {
            type: String,
            default: 'en'
        },
    }
},
{
    timestamps: true
})
