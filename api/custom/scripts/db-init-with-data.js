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

    async function addUserToBusiness(credentials, data){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'post',
            url:url + '/v1/s/business/user',
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

    async function acceptForShift(credentials, shiftId, userId){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'get',
            url:url + `/v1/s/shift/accept?shiftId=${shiftId}&userId=${userId}`
        })

        console.log('accepted for shift', result.data)

        return result.data

    }

    async function declineForShift(credentials, shiftId, userId){

        await login(credentials.username, credentials.password)

        const result = await axios({
            method:'get',
            url:url + `/v1/s/shift/decline?shiftId=${shiftId}&userId=${userId}`
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
            TimesheetModel = require('../../custom/models/timesheet')
        } catch {
            TimesheetModel = require('../../default/models/timesheet')
        }

        try {
            InvoiceModel = require('../../custom/models/invoice')
        } catch {
            InvoiceModel = require('../../default/models/invoice')
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

        await TimesheetModel.collection?.dropIndexes()
        await TimesheetModel.collection?.drop()

        await InvoiceModel.collection?.dropIndexes()
        await InvoiceModel.collection?.drop()

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
            password:'password1',
            email:'admin2@greenlance.nl',
            roles:['admin'],
        })

        // create users which will belong to employer businesses

        const user1 = await register({
            username:'user1',
            password:'password1',
            repeatPassword:'password1',
            email:'user1@business1.nl',
            roles:['user'],
            accountType:'business'
        })

        const user2 = await register({
            username:'user2',
            password:'password1',
            repeatPassword:'password1',
            email:'user2@business1.nl',
            roles:['user'],
            accountType:'business'
        })

        const user3 = await register({
            username:'user3',
            password:'password1',
            repeatPassword:'password1',
            email:'user3@business1.nl',
            roles:['user'],
            accountType:'business'
        })

        const user4 = await register({
            username:'user4',
            password:'password1',
            repeatPassword:'password1',
            email:'user4@business2.nl',
            roles:['user'],
            accountType:'business'
        })

        const user5 = await register({
            username:'user5',
            password:'password1',
            repeatPassword:'password1',
            email:'user5@business2.nl',
            roles:['user'],
            accountType:'business'
        })

        // create users which will belong to freelance businesses

        const user6 = await register({
            username:'user6',
            password:'password1',
            repeatPassword:'password1',
            email:'user6@freelancer1.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        const user7 = await register({
            username:'user7',
            password:'password1',
            repeatPassword:'password1',
            email:'user7@freelancer2.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        const user8 = await register({
            username:'user8',
            password:'password1',
            repeatPassword:'password1',
            email:'user8@freelancer3.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        const user9 = await register({
            username:'user9',
            password:'password1',
            repeatPassword:'password1',
            email:'user9@freelancer4.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        const user10 = await register({
            username:'user10',
            password:'password1',
            repeatPassword:'password1',
            email:'user10@freelancer5.nl',
            roles:['user'],
            accountType:'freelancer'
        })

        // create businesses

        await createBusiness({
            username:'user1',
            password:'password1'
        },{
            name:'business1',
        })

        await createBusiness({
            username:'user4',
            password:'password1'
        },{
            name:'business2',
        })

        // add user to business

        await addUserToBusiness({
            username:'user1',
            password:'password1'
        },{
            user:user2._id,
        })

        await addUserToBusiness({
            username:'user4',
            password:'password1'
        },{
            user:user5._id,
        })


        // create freelancers

        const freelancer1 = await createFreelancer({
            username:'user6',
            password:'password1'
        },{
            name:'freelancer1',
        })

        const freelancer2 = await createFreelancer({
            username:'user7',
            password:'password1'
        },{
            name:'freelancer2',
        })

        const freelancer3 = await createFreelancer({
            username:'user8',
            password:'password1'
        },{
            name:'freelancer3',
        })

        const freelancer4 = await createFreelancer({
            username:'user9',
            password:'password1'
        },{
            name:'freelancer4',
        })

        const freelancer5 = await createFreelancer({
            username:'user10',
            password:'password1'
        },{
            name:'freelancer5',
        })

        // create shifts

        const shift1 = await createShift({
            username:'user1',
            password:'password1'
        },{
            name:'Snoeien',
            description:'Snoeiwerkzaamheden aan het spoor',
            price:'30,00',
            positions:3,
            datetime:{
                start:moment().startOf('day').add(1, 'days').add(8, 'hours'),
                end:moment().startOf('day').add(1, 'days').add(16, 'hours'),
            },
            location:{
                start:{ city:'Kampen' },
                end:{ city:'Kampen' },
            }
        })

        const shift2 = await createShift({
            username:'user1',
            password:'password1'
        },{
            name:'Snoeien',
            description:'Snoeiwerkzaamheden aan het spoor',
            price:'30,00',
            positions:3,
            datetime:{
                start:moment().startOf('day').add(7, 'days').add(10, 'hours'),
                end:moment().startOf('day').add(7, 'days').add(20, 'hours'),
            },
            location:{
                start:{ city:'Kampen' },
                end:{ city:'Kampen' },
            }
        })

        const shift3 = await createShift({
            username:'user1',
            password:'password1'
        },{
            name:'Snoeien',
            description:'Snoeiwerkzaamheden aan het spoor',
            price:'30,00',
            positions:3,
            datetime:{
                start:moment().startOf('day').add(1, 'days').add(10, 'hours'),
                end:moment().startOf('day').add(1, 'days').add(20, 'hours'),
            },
            location:{
                start:{ city:'Kampen' },
                end:{ city:'Kampen' },
            }
        })

        const shift4 = await createShift({
            username:'user2',
            password:'password1'
        },{
            name:'Rupsen',
            description:'Nesten weghalen',
            price:'32,00',
            positions:2,
            datetime:{
                start:moment().startOf('day').add(2, 'days').add(8, 'hours'),
                end:moment().startOf('day').add(2, 'days').add(16, 'hours'),
            },
            location:{
                start:{ city:'Staphorst' },
                end:{ city:'Staphorst' },
            }
        })

        const shift5 = await createShift({
            username:'user2',
            password:'password1'
        },{
            name:'Rupsen',
            description:'Nesten weghalen',
            price:'32,00',
            positions:2,
            datetime:{
                start:moment().startOf('day').add(3, 'days').add(8, 'hours'),
                end:moment().startOf('day').add(3, 'days').add(16, 'hours'),
            },
            location:{
                start:{ city:'Staphorst' },
                end:{ city:'Staphorst' },
            }
        })

        const shift6 = await createShift({
            username:'user2',
            password:'password1'
        },{
            name:'Rupsen',
            description:'Nesten weghalen',
            price:'32,00',
            positions:2,
            datetime:{
                start:moment().startOf('day').add(4, 'days').add(8, 'hours'),
                end:moment().startOf('day').add(4, 'days').add(16, 'hours'),
            },
            location:{
                start:{ city:'Staphorst' },
                end:{ city:'Staphorst' },
            }
        })

        const shift7 = await createShift({
            username:'user2',
            password:'password1'
        },{
            name:'Rupsen',
            description:'Nesten weghalen',
            price:'32,00',
            positions:2,
            datetime:{
                start:moment().startOf('day').add(5, 'days').add(8, 'hours'),
                end:moment().startOf('day').add(5, 'days').add(16, 'hours'),
            },
            location:{
                start:{ city:'Staphorst' },
                end:{ city:'Staphorst' },
            }
        })

        const shift8 = await createShift({
            username:'user2',
            password:'password1'
        },{
            name:'Rupsen',
            description:'Nesten weghalen',
            price:'32,00',
            positions:2,
            datetime:{
                start:moment().startOf('day').add(6, 'days').add(8, 'hours'),
                end:moment().startOf('day').add(6, 'days').add(16, 'hours'),
            },
            location:{
                start:{ city:'Staphorst' },
                end:{ city:'Staphorst' },
            }
        })

        await applyForShift({
            username:'user6',
            password:'password1'
        },
            shift1._id
        )

        await applyForShift({
            username:'user7',
            password:'password1'
        },
            shift1._id
        )

        await applyForShift({
            username:'user8',
            password:'password1'
        },
            shift1._id
        )

        await applyForShift({
            username:'user9',
            password:'password1'
        },
            shift1._id
        )

        await acceptForShift(
            {
                username:'user1',
                password:'password1'
            },
            shift1._id,
            user6._id
        )

        await acceptForShift(
            {
                username:'user1',
                password:'password1'
            },
            shift1._id,
            user7._id
        )

        await acceptForShift(
            {
                username:'user2',
                password:'password1'
            },
            shift1._id,
            user8._id
        )

        await withdrawFromShift(
            {
                username:'user6',
                password:'password1'
            },
            shift1._id,
        )

        await acceptForShift(
            {
                username:'user2',
                password:'password1'
            },
            shift1._id,
            user9._id
        )

        await applyForShift({
            username:'user10',
            password:'password1'
        },
            shift2._id
        )

        await declineForShift(
            {
                username:'user1',
                password:'password1'
            },
            shift2._id,
            user10._id
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
