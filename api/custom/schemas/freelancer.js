const { Schema } = require('mongoose')

module.exports = new Schema({
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    experience: [{
        duration: {
            type: String
        },
        description: {
            type: String
        },
    }],
    info: {
        kvk: {
            type: String
        },
        tax: {
            type: String
        },
    },
    addresses: [{
        type: Schema.Types.Mixed
    }],
    phones: [{
        type: String
    }],
    emails: [{
        type: String
    }],
    labels:{
        type: [String]
    },
    rating: {
        type: Number
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'Review',
    },
    connections: {
        type: [Schema.Types.ObjectId],
        ref: 'Client',
    },
    applied: {
        type: [Schema.Types.ObjectId],
        ref: 'Shift',
    },
    enrolled: {
        type: [Schema.Types.ObjectId],
        ref: 'Shift',
    },
    withdrawn: {
        type: [Schema.Types.ObjectId],
        ref: 'Shift',
    },
    mutations:{
        type: [Schema.Types.ObjectId],
        ref: 'Mutation',
    }
},
{
    timestamps: true
})
