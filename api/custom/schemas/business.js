const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    description: {
        type: String,
    },
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
    shifts: {
        type: [Schema.Types.ObjectId],
        ref: 'Shift',
    },
    connectedFreelancers: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer',
    },
    blacklistedFreelancers: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer',
    },
    whitelistedFreelancers: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer',
    },
    mutations:{
        type: [Schema.Types.ObjectId],
        ref: 'Mutation',
    }
},
{
    timestamps: true
})
