const mongoose = require('mongoose')

let projectSchema = require('../../custom/schemas/project')

module.exports = mongoose.model(
    'Project',
    projectSchema
)
