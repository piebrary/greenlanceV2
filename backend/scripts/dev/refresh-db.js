const axios = require('axios')

const UserModel = require('../../lib/models/user')
const EventModel = require('../../lib/models/event')

const encryptPassword = require('../../lib/utils/encryptPassword')
const dbConfig = require('../../../config/db')
const serverConfig = require('../../../config/server')
const url = `http://localhost:${serverConfig.PORT}${serverConfig.PREFIX}`

;(async () => {

    try {

        if(serverConfig.MODE !== 'DEV'){

            console.log('Can not refresh db due to config MODE not being set to \'DEV\'')

            process.exit()

        }

        const db = await require('../../lib/server/db.js')(dbConfig)

        await UserModel.collection?.dropIndexes()
        await UserModel.collection?.drop()

        await EventModel.collection?.dropIndexes()
        await EventModel.collection?.drop()

        await createFirstUser({
            username:'admin1',
            password:'password1',
            email:'admin1@admins.com',
            roles:['admin'],
            firstName:'Admin',
            lastName:'One',
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
            email:'admin2@admins.com',
            roles:['admin'],
            firstName:'Admin',
            lastName:'Two',
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
            firstName:'Admin',
            lastName:'Three',
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
            firstName:'Admin',
            lastName:'Four',
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
            firstName:'Admin',
            lastName:'Five',
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
            email:'superuser1@superusers.com',
            roles:['superuser'],
            firstName:'Superuser',
            lastName:'One',
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
            email:'superuser2@superusers.com',
            roles:['superuser'],
            firstName:'Superuser',
            lastName:'Two',
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
            email:'superuser3@superusers.com',
            roles:['superuser'],
            firstName:'Superuser',
            lastName:'Three',
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
            email:'user1@users.com',
            roles:['user'],
            firstName:'User',
            lastName:'One',
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
            email:'user2@users.com',
            roles:['user'],
            firstName:'User',
            lastName:'Two',
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
            email:'user3@users.com',
            roles:['user'],
            firstName:'User',
            lastName:'Three',
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
            email:'user4@users.com',
            roles:['user'],
            firstName:'User',
            lastName:'Four',
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
            email:'user5@users.com',
            roles:['user'],
            firstName:'User',
            lastName:'Five',
        })

        await createEvent({
            username:'user1',
            password:'password1'
        },{
            title:'1 name',
            body:'event from user1',
            time:{
                start:1645660801000,
                end:1645680801000
            },
            active:true
        })

        await createEvent({
            username:'user1',
            password:'password1'
        },{
            title:'2 name',
            body:'project van user1',
            time:{
                start:1645660801000,
                end:1645680801000
            },
            active:true
        })

        await createEvent({
            username:'user1',
            password:'password1'
        },{
            title:'3 name',
            body:'3 description',
            time:{
                start:1645660801000,
                end:1645680801000
            },
            active:true
        })

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
