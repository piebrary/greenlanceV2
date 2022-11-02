const mongoose = require('mongoose')
const { Schema } = require('mongoose')

module.exports = new Schema({
    title: {
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
    payment:{
        type: String
    },
    label:{
        type: String
    },
    spots: {
        type: Number
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
    applied: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer',
    },
    enrolled: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer',
    },
    withdrawn: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer',
    },
    onDuty: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Freelancer',
            required: true
        },
        time: {
            type: Date,
            required: true
        }
    },
    checkout: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Freelancer',
            required: true
        },
        time: {
            type: Date,
            required: true
        }
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
