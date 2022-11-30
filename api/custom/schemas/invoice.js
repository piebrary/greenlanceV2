const { Schema } = require('mongoose')

module.exports = new Schema({
    name:{
        type: String,
        required: true,
    },
    business:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Business'
    },
    freelancer:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Freelancer'
    },
    isSend:{
        type: Boolean,
        required: true,
        default: false
    },
    isPayed:{
        type: Boolean,
        required: true,
        default: false
    },
    hours:{
        type: String,
        requried: true,
    },
    amount:{
        type: String,
        requried: true,
    },
    billingDate:{
        type: Date,
        required: true,
    },
    mutations:{
        type: [Schema.Types.ObjectId],
        ref: 'Mutation',
    }
},
{
    timestamps: true
})
