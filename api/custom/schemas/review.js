const { Schema } = require('mongoose')

module.exports = new Schema({
    subject: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'subjectModel'
    },
    subjectModel: {
        type: String,
        required: true,
        enum: ['freelancer', 'client']
    },
    reviewer: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'reviewerModel'
    },
    reviewerModel: {
        type: String,
        required: true,
        enum: ['freelancer', 'client']
    },
    rating:{
        type: String,
        required: true,
    },
    comment: {
        type: Number
    },
    mutations:{
        type: [Schema.Types.ObjectId],
        ref: 'Mutation',
    }
},
{
    timestamps: true
})
