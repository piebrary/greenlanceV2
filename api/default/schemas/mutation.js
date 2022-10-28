const { Schema } = require('mongoose')

module.exports = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    action: {
        type: String,
        required: true,
    },
    data: {
        type: Schema.Types.Mixed,

    },
},
{
    timestamps: true
})
