const axios = require('axios')
const moment = require('moment')

require('dotenv').config({ path:'../../.env' })

const url = `http://localhost:${process.env.API_PORT}${process.env.API_PREFIX}`

module.exports = (async () => {

    async function login(username, password){

        const loginResult = await axios({
            url:url + '/login',
            method:'POST',
            data:{
                username:username,
                password:password
            }
        })

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginResult.headers.jwt

        console.log('user', username, 'logged in')

        await getUserData()

        return

    }

    async function getUserData(){

        const userData = await axios({
            url:url + '/v1/s/user',
            method:'get'
        })

        console.log('userdata fetched')

        return userData.data

    }

    async function createFirstUser(data){

        const newUserDocument = new UserModel()
        newUserDocument.username = data.username
        newUserDocument.passwordHash = await encryptPassword(data.password)
        newUserDocument.email = data.email
        newUserDocument.roles = data.roles
        newUserDocument.name = data.name

        await newUserDocument.save()

        console.log('created first user admin')

    }

    async function createUser(credentials, data){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'post',
            url:url + '/v1/s/user',
            data:data
        })

        console.log('created user', result.data)

    }

    let UserModel, EventModel, FreelancerModel, BusinessModel, ReviewModel, ProjectModel, ShiftModel, MutationModel, encryptPassword, db

    try {

        try {
            UserModel = require('../../custom/models/user')
        } catch {
            UserModel = require('../../default/models/user')
        }

        try {
            EventModel = require('../../custom/models/event')
        } catch {
            EventModel = require('../../default/models/event')
        }

        try {
            FreelancerModel = require('../../custom/models/freelancer')
        } catch {
            FreelancerModel = require('../../default/models/freelancer')
        }

        try {
            BusinessModel = require('../../custom/models/business')
        } catch {
            BusinessModel = require('../../default/models/business')
        }

        try {
            ReviewModel = require('../../custom/models/review')
        } catch {
            ReviewModel = require('../../default/models/review')
        }

        try {
            ProjectModel = require('../../custom/models/project')
        } catch {
            ProjectModel = require('../../default/models/project')
        }

        try {
            ShiftModel = require('../../custom/models/shift')
        } catch {
            ShiftModel = require('../../default/models/shift')
        }

        try {
            MutationModel = require('../../custom/models/mutation')
        } catch {
            MutationModel = require('../../default/models/mutation')
        }

        try {
            encryptPassword = require('../../custom/utils/encryptPassword')
        } catch {
            encryptPassword = require('../../default/utils/encryptPassword')
        }

        try {
            db = await require('../../custom/server/db.js')()
        } catch {
            db = await require('../../default/server/db.js')()
        }

        await UserModel.collection?.dropIndexes()
        await UserModel.collection?.drop()

        await EventModel.collection?.dropIndexes()
        await EventModel.collection?.drop()

        await FreelancerModel.collection?.dropIndexes()
        await FreelancerModel.collection?.drop()

        await BusinessModel.collection?.dropIndexes()
        await BusinessModel.collection?.drop()

        await ReviewModel.collection?.dropIndexes()
        await ReviewModel.collection?.drop()

        await ProjectModel.collection?.dropIndexes()
        await ProjectModel.collection?.drop()

        await ShiftModel.collection?.dropIndexes()
        await ShiftModel.collection?.drop()

        await MutationModel.collection?.dropIndexes()
        await MutationModel.collection?.drop()

        await createFirstUser({
            username:'admin1',
            password:'password1',
            email:'admin1@greenlance.nl',
            roles:['admin'],
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'admin2',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'admin2@greenlance.nl',
            roles:['admin'],
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'admin3',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'admin3@@greenlance.nl',
            roles:['admin'],
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'Bedrijf1',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'bedrijf1@bedrijf1.nl',
            roles:['business']
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'Bedrijf2',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'bedrijf2@bedrijf2.nl',
            roles:['business']
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'Bedrijf3',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'bedrijf3@bedrijf3.nl',
            roles:['business']
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'freelancer1',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'freelancer1@freelancer1.nl',
            roles:['freelancer'],
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'freelancer2',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'freelancer2@freelancer2.nl',
            roles:['freelancer'],
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'freelancer3',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'freelancer3@freelancer3.nl',
            roles:['freelancer'],
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'freelancer4',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'freelancer4@freelancer4.nl',
            roles:['freelancer'],
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'freelancer5',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'freelancer5@freelancer5.nl',
            roles:['freelancer'],
        })

        console.log('Finished inserting data')

    } catch (error) {

        console.log('==== NEW ERROR ====')

        if(
            error.request
            && error.response
            && error.config
        ){

            console.log('- request.path', error.request?.path)
            console.log('- response.statusText', error.response?.statusText)
            console.log('- response.status', error.response?.status)
            console.log('- request.method', error.request?.method)
            console.log('- config.data', error.config?.data)
            console.log('- response.data', error.response?.data)

            return

        }

        console.log(error)

    }

    process.exit()

})()
