const mongoose = require('mongoose')
const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    label:{
        type: String
    },
    datetime: {
        start: {
            type: Date,
            required: true,
        },
        end: {
            type: Date,
            required: true
        }
    },
    location:{
        start: {
            label: String,
            street: String,
            number: String,
            zipCode: String,
            city: String,
            province: String,
            country: String,
        },
        end: {
            label: String,
            street: String,
            number: String,
            zipCode: String,
            city: String,
            province: String,
            country: String,
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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rights:{
        view:{
            type: [Schema.Types.ObjectId],
            ref: 'User',
        },
        edit:{
            type: [Schema.Types.ObjectId],
            ref: 'User',
        },
    },
    active:{
        type: Boolean,
        required: true
    },
    mutations:{
        type: [Schema.Types.ObjectId],
        ref: 'Mutation',
    }
},
{
    timestamps: true
})
