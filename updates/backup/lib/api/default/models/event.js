const mongoose = require('mongoose')

let eventSchema

try {
    eventSchema = require('../../custom/schemas/event')
} catch {
    eventSchema = require('../../default/schemas/event')
}

module.exports = mongoose.model(
    'Event',
    eventSchema
)
