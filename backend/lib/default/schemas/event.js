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
    category:{
        type: String
    },
    time:{
        from: {
            type: Number,
            required: true,
        },
        until: {
            type: Number,
            required: true
        },
    },
    location:{
        start: {
            type: String,
        },
        end: {
            type: String,
        },
    },
    recurring:{
        interval: {
            type: String,
        },
        until: {
            type: Number,
        },
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rights:{
        view:{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
        },
        edit:{
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
        },
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
