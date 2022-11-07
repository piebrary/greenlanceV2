const mongoose = require('mongoose')

let reviewSchema require('../schemas/review')

module.exports = mongoose.model(
    'Review',
    reviewSchema
)
