const { Schema } = require('mongoose')

module.exports = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    name:{
        type: String
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
    businessInfo: {
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
    connectedBusinesses: {
        type: [Schema.Types.ObjectId],
        ref: 'Business',
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
