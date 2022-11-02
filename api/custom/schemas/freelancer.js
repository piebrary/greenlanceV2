const { Schema } = require('mongoose')

module.exports = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: Number
    },
    reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'Review',
    },
    businesses: {
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
