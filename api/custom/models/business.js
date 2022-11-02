const mongoose = require('mongoose')

let businessSchema require('../schemas/business')

module.exports = mongoose.model(
    'Business',
    businessSchema
)
