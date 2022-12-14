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
    date:{
        from: {
            type: String,
            required: true,
        },
        until: {
            type: String,
            required: true
        },
    },
    time:{
        from: {
            type: String,
            required: true,
        },
        until: {
            type: String,
            required: true
        },
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
