const mongoose = require('mongoose')

let timesheetSchema = require('../../custom/schemas/timesheet')

module.exports = mongoose.model(
    'Timesheet',
    timesheetSchema
)
