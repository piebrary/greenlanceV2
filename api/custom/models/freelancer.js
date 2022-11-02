const mongoose = require('mongoose')

let freelancerSchema = require('../schemas/freelancer')

module.exports = mongoose.model(
    'Freelancer',
    freelancerSchema
)
