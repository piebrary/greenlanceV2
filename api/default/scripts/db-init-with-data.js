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

    async function createEvent(credentials, data){

        await login(credentials.username, credentials.password)

        const userData = await getUserData()

        data.creator = userData._id

        const result = await axios ({
            method:'post',
            url:url + '/v1/s/event',
            data:data
        })

        console.log('created event', result.data)

    }

    let UserModel, EventModel, encryptPassword, db

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

        await MutationModel.collection?.dropIndexes()
        await MutationModel.collection?.drop()

        await createFirstUser({
            username:'admin1',
            password:'password1',
            email:'admin1@admins.com',
            roles:['admin'],
            name: { first:'Admin', last:'One' }
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
            email:'piedema@gmail.com',
            roles:['admin'],
            name: { first:'Admin', last:'Two' }
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
            email:'admin3@admins.com',
            roles:['admin'],
            name: { first:'Admin', last:'Three' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'admin4',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'admin4@admins.com',
            roles:['admin'],
            name: { first:'Admin', last:'Four' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'admin5',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'admin5@admins.com',
            roles:['admin'],
            name: { first:'Admin', last:'Three' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'superuser1',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'superuser1@admins.com',
            roles:['superuser'],
            name: { first:'Superuser', last:'One' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'superuser2',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'superuser2@admins.com',
            roles:['superuser'],
            name: { first:'Superuser', last:'Two' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'superuser3',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'superuser3@admins.com',
            roles:['superuser'],
            name: { first:'Superuser', last:'Three' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'user1',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'user1@admins.com',
            roles:['user'],
            name: { first:'User', last:'One' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'user2',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'user2@admins.com',
            roles:['user'],
            name: { first:'User', last:'Two' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'user3',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'user3@admins.com',
            roles:['user'],
            name: { first:'User', last:'Three' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'user4',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'user4@admins.com',
            roles:['user'],
            name: { first:'User', last:'Four' }
        })

        await createUser({
            username:'admin1',
            password:'password1'
        },
        {
            username:'user5',
            newPassword:'password1',
            repeatPassword:'password1',
            currentPassword:'password1',
            email:'user5@admins.com',
            roles:['user'],
            name: { first:'User', last:'Five' }
        })

        await createEvent({
            username:'admin1',
            password:'password1'
        },{
            name:'1 name',
            description:'event from admin1',
            datetime:{
                start:new Date(),
                end:(() => { const date = new Date(); date.setDate(date.getDate() + 2); return date; })()
            },
            location:{
                start:{
                    street:'Klein Grachtje',
                    number:'5',
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    province:'Overijssel',
                    country:'Nederland'
                }
            },
            active:true
        })

        await createEvent({
            username:'admin1',
            password:'password1'
        },{
            name:'2 name',
            description:'project van admin1',
            datetime:{
                start:(() => { const date = new Date(); date.setDate(date.getDate() + 4); date.setHours(date.getHours() + 3); return date; })(),
                end:(() => { const date = new Date(); date.setDate(date.getDate() + 4); date.setHours(date.getHours() + 6); return date; })()
            },
            active:true
        })

        await createEvent({
            username:'admin1',
            password:'password1'
        },{
            name:'3 name',
            description:'3 description',
            datetime:{
                start:(() => { const date = new Date(); date.setDate(date.getDate() + 6); date.setHours(date.getHours() + 12); return date; })(),
                end:(() => { const date = new Date(); date.setDate(date.getDate() + 10); date.setHours(date.getHours() + 16); return date; })()
            },
            active:true
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
