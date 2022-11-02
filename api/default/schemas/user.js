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
    email: {
        type: String,
        unique: [true, 'That email address is taken.'],
        required: true
    },
    phone: {
        type: String
    },
    address: {
        type: Schema.Types.Mixed
    },
    emails: [
        {
            label: {
                type: String
            },
            email: {
                type: String
            }
        }
    ],
    phones: [
        {
            label: {
                type: String
            },
            phone: {
                type: String
            }
        }
    ],
    addresses: [
        {
            type: Schema.Types.Mixed
        }
    ],
    settings: {
        language: {
            type: String,
        },
    },
    mutations:{
        type: [Schema.Types.ObjectId],
        ref: 'Mutation',
    }
},
{
    timestamps: true
})
