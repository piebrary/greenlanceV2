const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String
    },
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
    },
    description: {
        type: String,
    },
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
    freelancers: {
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
