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
    price:{
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
        default:[]
    },
    enrolled: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer',
        default:[]
    },
    withdrawn: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer',
        default:[]
    },
    checkIn: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Freelancer',
            required: true
        },
        datetime: {
            type: Date,
            required: true
        }
    }],
    checkOut: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Freelancer',
            required: true
        },
        datetime: {
            type: Date,
            required: true
        }
    }],
    active:{
        type: Boolean,
        default: true,
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
