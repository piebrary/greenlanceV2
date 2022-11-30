const { Schema } = require('mongoose')

module.exports = new Schema({
    shift:{
        type: Schema.Types.ObjectId,
        ref: 'Shift',
    },
    freelancer:{
        type: Schema.Types.ObjectId,
        ref: 'Freelancer',
    },
    business:{
        type: Schema.Types.ObjectId,
        ref: 'Business',
    },
    planned: {
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true
        }
    },
    actualByFreelancer: {
        start: {
            type: Date,
        },
        end: {
            type: Date,
        }
    },
    actualByBusiness: {
        start: {
            type: Date,
        },
        end: {
            type: Date,
        }
    },
    status: {
        type: String,
        required: true,
        default: 'open',
        enum: ['open', 'accepted', 'disputed', 'billed']
    },
    mutations:{
        type: [Schema.Types.ObjectId],
        ref: 'Mutation',
    }
},
{
    timestamps: true
})
