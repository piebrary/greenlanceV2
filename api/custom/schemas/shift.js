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
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    price:{
        type: String
    },
    label:{
        type: String
    },
    positions: {
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
            city: {
                type: String,
                required: true,
            },
            province: String,
            country: String,
        },
        // end: {
        //     label: String,
        //     street: String,
        //     number: String,
        //     zipCode: String,
        //     city: String,
        //     province: String,
        //     country: String,
        // },
    },
    recurring:{
        interval: {
            type: String
        },
        start: {
            type: Date
        },
        end: {
            type: Date
        },
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    applied: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer'
    },
    enrolled: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer'
    },
    withdrawn: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer'
    },
    declined: {
        type: [Schema.Types.ObjectId],
        ref: 'Freelancer'
    },
    timesheets: {
        type: [Schema.Types.ObjectId],
        ref: 'Timesheet',
        default:[]
    },
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
