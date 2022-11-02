const mongoose = require('mongoose')

let shiftSchema = require('../../custom/schemas/shift')

module.exports = mongoose.model(
    'Shift',
    shiftSchema
)
