const mongoose = require('mongoose')

let invoiceSchema = require('../../custom/schemas/invoice')

module.exports = mongoose.model(
    'Invoice',
    invoiceSchema
)
