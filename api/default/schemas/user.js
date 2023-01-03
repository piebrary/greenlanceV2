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
    roles: {              // user can have multiple roles, therefor use an array
        type: Array,
        required: true,
    },
    email: {
        type: String,
        unique: [true, 'That email address is taken.'],
        required: true
    },
    settings: {
        language: {
            type: String,
            default:'en'
        },
    },
    profile: {
        picture: {
            type: String
        },
        name: {
            first: {
                type: String
            },
            last: {
                type: String
            }
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
    },
    mutations:{
        type: [Schema.Types.ObjectId],
        ref: 'Mutation',
    }
},
{
    timestamps: true
})
