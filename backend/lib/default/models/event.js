const mongoose = require('mongoose')

let eventSchema

try { eventSchema = require('../../custom/schemas/event') } catch { eventSchema = require('../schemas/event') }

module.exports = mongoose.model(
    'Event',
    eventSchema
)
