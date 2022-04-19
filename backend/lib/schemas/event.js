const mongoose = require('mongoose')
const { Schema } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        required: true,
    },
    body:{
        type: String
    },
    time:{
        start: {
            type: Number,
            required: true,
        },
        end: {
            type: Number,
            required: true
        },
    },
    users:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active:{
        type: Boolean,
        required: true
    },
    mutations:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Mutation',
    }
},
{
    timestamps: true
})
