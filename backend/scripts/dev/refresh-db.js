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

        await createFirstUser()

        await createUser({
            username:'admin',
            password:'password1'
        },
        {
            username:'peter01',
            password:'password1',
            firstName:'Peter',
            lastName:'Iedema',
            email:'piedema@gmail.com',
            roles:['admin', 'user']
        })

        await createUser({
            username:'admin',
            password:'password1'
        },{
            username:'julian01',
            password:'password1',
            firstName:'Julian',
            lastName:'Kors',
            email:'julian@kors.com',
            roles:['user']
        })

        await createUser({
            username:'admin',
            password:'password1'
        },{
            username:'remy01',
            password:'password1',
            firstName:'Remy',
            lastName:'Kool',
            email:'remy@kool.com',
            roles:['admin', 'user']
        })

        await createUser({
            username:'admin',
            password:'password1'
        },{
            username:'mariska01',
            password:'password1',
            firstName:'Mariska',
            lastName:'Duin',
            email:'mariska@duin.com',
            roles:['user']
        })

        await createEvent({
            username:'julian01',
            password:'password1'
        },{
            title:'1 name',
            body:'event from julian',
            time:{
                start:1645660801000,
                end:1645680801000
            },
            active:true
        })

        await createEvent({
            username:'remy01',
            password:'password1'
        },{
            title:'2 name',
            body:'project van remy',
            time:{
                start:1645660801000,
                end:1645680801000
            },
            active:true
        })

        await createEvent({
            username:'remy01',
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
        url:url + '/s/v1/user',
        method:'get'
    })

    console.log('userdata fetched')

    return userData.data

}

async function createFirstUser(){

    const newUserDocument = new UserModel()
    newUserDocument.username = 'admin'
    newUserDocument.passwordHash = await encryptPassword('password1')
    newUserDocument.firstName = 'Admin'
    newUserDocument.lastName = 'Admin'
    newUserDocument.email = 'admin@admin.com'
    newUserDocument.roles = ['admin']

    await newUserDocument.save()

    console.log('created first user admin')

}

async function createUser(credentials, data){

    await login(credentials.username, credentials.password)

    const result = await axios({
        method:'post',
        url:url + '/s/v1/user',
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
        url:url + '/s/v1/event',
        data:data
    })

    console.log('created event', result.data)

}
