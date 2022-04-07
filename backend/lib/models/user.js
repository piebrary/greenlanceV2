const mongoose = require('mongoose')

const userSchema = require('../schemas/user')

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
