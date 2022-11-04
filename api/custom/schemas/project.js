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
    business: {
        type: Schema.Types.ObjectId,
        ref: 'Business'
    },
    shifts:{
        type: [Schema.Types.ObjectId],
        ref: 'Shift',
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
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
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
