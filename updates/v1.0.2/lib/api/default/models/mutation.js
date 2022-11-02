const mongoose = require('mongoose')

let mutationSchema

try {
    mutationSchema = require('../../custom/schemas/mutation')
} catch {
    mutationSchema = require('../../default/schemas/mutation')
}

module.exports = mongoose.model(
    'Mutation',
    mutationSchema
)
