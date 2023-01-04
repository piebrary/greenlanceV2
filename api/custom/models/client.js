const mongoose = require('mongoose')

let clientSchema = require('../schemas/client')

module.exports = mongoose.model(
    'Client',
    clientSchema
)
