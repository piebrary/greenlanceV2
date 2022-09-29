const mongoose = require('mongoose')

let tokenSchema

try {
    tokenSchema = require('../../custom/schemas/token')
} catch {
    tokenSchema = require('../../default/schemas/token')
}

module.exports = mongoose.model(
    'Token',
    tokenSchema
)
