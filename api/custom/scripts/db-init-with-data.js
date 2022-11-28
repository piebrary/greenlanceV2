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

        const result = await axios({
            url:url + '/v1/s/user',
            method:'get'
        })

        console.log('userdata fetched')

        return result.data

    }

    async function createFirstUser(data){

        const newUserDocument = new UserModel()
        newUserDocument.username = data.username
        newUserDocument.passwordHash = await encryptPassword(data.password)
        newUserDocument.email = data.email
        newUserDocument.roles = data.roles
        newUserDocument.name = data.name

        const result = await newUserDocument.save()

        console.log('created first user admin')

        return result.data

    }

    async function createUser(credentials, data){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'post',
            url:url + '/v1/s/user',
            data:data
        })

        console.log('created user', result.data)

        return result.data

    }

    async function register(data){

        // await login(credentials.username, credentials.password)

        const result = await axios({
            method:'post',
            url:url + '/v1/register',
            data:data
        })

        console.log('registered user', result.data)

        return result.data

    }

    async function createBusiness(credentials, data){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'post',
            url:url + '/v1/s/business',
            data:data
        })

        console.log('created business', result.data)

        return result.data

    }

    async function createFreelancer(credentials, data){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'post',
            url:url + '/v1/s/freelancer',
            data:data
        })

        console.log('created freelancer', result.data)

        return result.data

    }

    async function createShift(credentials, data){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'post',
            url:url + '/v1/s/shift',
            data:data
        })

        console.log('created shift', result.data)

        return result.data

    }

    async function applyForShift(credentials, _id){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'get',
            url:url + `/v1/s/shift/apply/${_id}`,
        })

        console.log('applied for shift', result.data)

        return result.data

    }

    async function withdrawFromShift(credentials, _id){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'get',
            url:url + `/v1/s/shift/withdraw/${_id}`,
        })

        console.log('withdrawn from shift', result.data)

        return result.data

    }

    async function acceptForShift(credentials, shiftId, freelancerId){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'get',
            url:url + `/v1/s/shift/accept?shiftId=${shiftId}&freelancerId=${freelancerId}`
        })

        console.log('accepted for shift', result.data)

        return result.data

    }

    async function declineForShift(credentials, shiftId, freelancerId){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'get',
            url:url + `/v1/s/shift/decline?shiftId=${shiftId}&freelancerId=${freelancerId}`
        })

        console.log('declineed for shift', result.data)

        return result.data

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

        // create admins

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

        // create users which will belong to employer businesses

        await register({
            username:'businessUser1',
            password:'password1',
            repeatPassword:'password1',
            email:'businessUser1@@greenlance.nl',
            roles:['user'],
            accountType:'business'
        })

        await register({
            username:'businessUser2',
            password:'password1',
            repeatPassword:'password1',
            email:'businessUser2@@greenlance.nl',
            roles:['user'],
            accountType:'business'
        })

        await register({
            username:'businessUser3',
            password:'password1',
            repeatPassword:'password1',
            email:'businessUser3@@greenlance.nl',
            roles:['user'],
            accountType:'business'
        })

        // create users which will belong to freelance businesses

        const freelancerUser1 = await register({
            username:'freelancerUser1',
            password:'password1',
            repeatPassword:'password1',
            email:'freelancerUser1@@greenlance.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        const freelancerUser2 = await register({
            username:'freelancerUser2',
            password:'password1',
            repeatPassword:'password1',
            email:'freelancerUser2@@greenlance.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        const freelancerUser3 = await register({
            username:'freelancerUser3',
            password:'password1',
            repeatPassword:'password1',
            email:'freelancerUser3@@greenlance.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        const freelancerUser4 = await register({
            username:'freelancerUser4',
            password:'password1',
            repeatPassword:'password1',
            email:'freelancerUser4@@greenlance.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        const freelancerUser5 = await register({
            username:'freelancerUser5',
            password:'password1',
            repeatPassword:'password1',
            email:'freelancerUser5@@greenlance.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        // create businesses

        await createBusiness({
            username:'businessUser1',
            password:'password1'
        },{
            name:'business1',
        })

        await createBusiness({
            username:'businessUser2',
            password:'password1'
        },{
            name:'business2',
        })

        await createBusiness({
            username:'businessUser3',
            password:'password1'
        },{
            name:'business3',
        })

        // create freelancers

        const freelancer1 = await createFreelancer({
            username:'freelancerUser1',
            password:'password1'
        },{
            name:'freelancer1',
        })

        const freelancer2 = await createFreelancer({
            username:'freelancerUser2',
            password:'password1'
        },{
            name:'freelancer2',
        })

        const freelancer3 = await createFreelancer({
            username:'freelancerUser3',
            password:'password1'
        },{
            name:'freelancer3',
        })

        const freelancer4 = await createFreelancer({
            username:'freelancerUser4',
            password:'password1'
        },{
            name:'freelancer4',
        })

        const freelancer5 = await createFreelancer({
            username:'freelancerUser5',
            password:'password1'
        },{
            name:'freelancer5',
        })

        // create shifts

        const shift1 = await createShift({
            username:'businessUser1',
            password:'password1'
        },{
            name:'Snoeien',
            description:'Snoeiwerkzaamheden aan het spoor',
            price:'30,00',
            positions:3,
            datetime:{
                start:'2022-11-24T07:00:00Z',
                end:'2022-11-24T15:00:00Z',
            },
            location:{
                start:'Kampen',
                end:'Kampen'
            }
        })

        const shift2 = await createShift({
            username:'businessUser1',
            password:'password1'
        },{
            name:'Snoeien',
            description:'Snoeiwerkzaamheden aan het spoor',
            price:'30,00',
            positions:3,
            datetime:{
                start:'2022-11-25T07:00:00Z',
                end:'2022-11-25T15:00:00Z',
            },
            location:{
                start:'Kampen',
                end:'Kampen'
            }
        })

        const shift3 = await createShift({
            username:'businessUser2',
            password:'password1'
        },{
            name:'Rupsen',
            description:'Nesten weghalen',
            price:'32,00',
            positions:2,
            datetime:{
                start:'2022-11-24T08:00:00Z',
                end:'2022-11-24T16:00:00Z',
            },
            location:{
                start:'Staphorst',
                end:'Staphorst'
            }
        })

        await applyForShift({
            username:'freelancerUser1',
            password:'password1'
        },
            shift1._id
        )

        await applyForShift({
            username:'freelancerUser2',
            password:'password1'
        },
            shift1._id
        )

        await applyForShift({
            username:'freelancerUser3',
            password:'password1'
        },
            shift1._id
        )

        await applyForShift({
            username:'freelancerUser4',
            password:'password1'
        },
            shift1._id
        )

        await acceptForShift(
            {
                username:'businessUser1',
                password:'password1'
            },
            shift1._id,
            freelancer1._id
        )

        await acceptForShift(
            {
                username:'businessUser1',
                password:'password1'
            },
            shift1._id,
            freelancer2._id
        )

        await acceptForShift(
            {
                username:'businessUser1',
                password:'password1'
            },
            shift1._id,
            freelancer3._id
        )

        await withdrawFromShift(
            {
                username:'freelancerUser1',
                password:'password1'
            },
            shift1._id,
        )

        await acceptForShift(
            {
                username:'businessUser1',
                password:'password1'
            },
            shift1._id,
            freelancer4._id
        )

        await applyForShift({
            username:'freelancerUser1',
            password:'password1'
        },
            shift2._id
        )

        await declineForShift(
            {
                username:'businessUser2',
                password:'password1'
            },
            shift2._id,
            freelancer1._id
        )

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
