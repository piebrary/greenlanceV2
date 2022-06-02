const mongoose = require('mongoose')

let userSchema

try { userSchema = require('../../custom/schemas/user') } catch { userSchema = require('../schemas/user') }

userSchema.virtual('isAdmin')
    .get(function(){

        return this.roles.includes('admin')

    })

userSchema.virtual('isSuperuser')
    .get(function(){

        return this.roles.includes('superuser')

    })

userSchema.virtual('isClient')
    .get(function(){

        return this.roles.includes('client')

    })

userSchema.virtual('isFreelancer')
    .get(function(){

        return this.roles.includes('freelancer')

    })

module.exports = mongoose.model(
    'User',
    userSchema
)
