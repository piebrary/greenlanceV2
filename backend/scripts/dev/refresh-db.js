const axios = require('axios')
const moment = require('moment')

const dbConfig = require('../../../config/db')
const serverConfig = require('../../../config/server')
const url = `http://localhost:${serverConfig.PORT}${serverConfig.PREFIX}`

let UserModel, EventModel, encryptPassword, db

;(async () => {

    try {

        if(serverConfig.MODE !== 'DEV'){

            console.log('Can not refresh db due to config MODE not being set to \'DEV\'')

            process.exit()

        }

        try {
            UserModel = require('../../lib/custom/models/user')
        } catch {
            UserModel = require('../../lib/default/models/user')
        }

        try {
            EventModel = require('../../lib/custom/models/event')
        } catch {
            EventModel = require('../../lib/default/models/event')
        }

        try {
            encryptPassword = require('../../lib/custom/utils/encryptPassword')
        } catch {
            encryptPassword = require('../../lib/default/utils/encryptPassword')
        }

        try {
            db = await require('../../lib/custom/server/db.js')(dbConfig)
        } catch {
            db = await require('../../lib/default/server/db.js')(dbConfig)
        }

        await UserModel.collection?.dropIndexes()
        await UserModel.collection?.drop()

        await EventModel.collection?.dropIndexes()
        await EventModel.collection?.drop()

        await createFirstUser({
            username:'admin1',
            password:'password1',
            email:[{ label:'primary', email:'admin1@admins.com' }],
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
            email:[{ label:'primary', email:'admin2@admins.com' }],
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
            email:[{ label:'primary', email:'admin3@admins.com' }],
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
            email:[{ label:'primary', email:'admin4@admins.com' }],
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
            email:[{ label:'primary', email:'admin5@admins.com' }],
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
            email:[{ label:'primary', email:'superuser1@admins.com' }],
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
            email:[{ label:'primary', email:'superuser2@admins.com' }],
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
            email:[{ label:'primary', email:'superuser3@admins.com' }],
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
            email:[{ label:'primary', email:'user1@admins.com' }],
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
            email:[{ label:'primary', email:'user1@admins.com' }],
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
            email:[{ label:'primary', email:'user1@admins.com' }],
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
            email:[{ label:'primary', email:'user1@admins.com' }],
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
            email:[{ label:'primary', email:'user1@admins.com' }],
            roles:['user'],
            name: { first:'User', last:'Five' }
        })

        await createEvent({
            username:'admin1',
            password:'password1'
        },{
            title:'1 name',
            body:'event from admin1',
            date:{
                from:moment().format('yyyy-MM-DD'),
                until:moment().format('yyyy-MM-DD')
            },
            time:{
                from:moment().format('HH:mm'),
                until:moment().add(1, 'hour').format('HH:mm')
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
            title:'2 name',
            body:'project van admin1',
            date:{
                from:moment().add(3, 'day').format('yyyy-MM-DD'),
                until:moment().add(3, 'day').format('yyyy-MM-DD')
            },
            time:{
                from:moment().add(1, 'hour').format('HH:mm'),
                until:moment().add(3, 'hour').format('HH:mm')
            },
            active:true
        })

        await createEvent({
            username:'admin1',
            password:'password1'
        },{
            title:'3 name',
            body:'3 description',
            date:{
                from:moment().add(5, 'day').format('yyyy-MM-DD'),
                until:moment().add(9, 'day').format('yyyy-MM-DD')
            },
            time:{
                from:moment().add(5, 'hour').format('HH:mm'),
                until:moment().add(3, 'hour').format('HH:mm')
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
