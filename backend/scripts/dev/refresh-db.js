const axios = require('axios')

const UserModel = require('../../lib/models/user')
const EventModel = require('../../lib/models/event')

const encryptPassword = require('../../lib/utils/encryptPassword')
const dbConfig = require('../../config/db')
const serverConfig = require('../../config/server')
const url = `http://localhost:${serverConfig.PORT}${serverConfig.prefix}`

let currentUser

;(async () => {

    try {

        if(serverConfig.MODE !== 'DEV'){

            console.log('Can not refresh db due to config MODE not being set to \'DEV\'')

            process.exit()

        }

        const db = await require('../../lib/server/db.js')(dbConfig)

        await UserModel.collection?.dropIndexes()
        await UserModel.collection?.drop()

        await BusinessModel.collection?.dropIndexes()
        await BusinessModel.collection?.drop()

        await ReviewModel.collection?.dropIndexes()
        await ReviewModel.collection?.drop()

        await ProjectModel.collection?.dropIndexes()
        await ProjectModel.collection?.drop()

        await ShiftModel.collection?.dropIndexes()
        await ShiftModel.collection?.drop()

        await EventModel.collection?.dropIndexes()
        await EventModel.collection?.drop()

        await TodoModel.collection?.dropIndexes()
        await TodoModel.collection?.drop()

        await createFirstAdmin()

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
            roles:['admin', 'freelancer']
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
            roles:['client']
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
            roles:['admin', 'client']
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
            roles:['freelancer']
        })

        await createBusiness({
            username:'admin',
            password:'password1'
        },{
            users:[
                'peter01',
                'mariska01'
            ],
            name:'p&m bv',
            website:'www.p&m.nl',
            description:'Dit is een description',
            businessType:'freelancer',
            emailAddresses:[{
                label:'email1',
                emailAddress:'p&m@gmail.com'
            }],
            phoneNumbers:[{
                label:'number1',
                phoneNumber:0630637261
            }],
            addresses:[{
                label:'Address1',
                street:'Klein Grachtje',
                number:5,
                zipCode:'8021 JD',
                city:'Zwolle',
                country:'Nederland'
            }]
        },
        [
            {
                username:'peter01',
                password:'password1'
            },
            {
                username:'mariska01',
                password:'password1'
            }
        ])

        await createBusiness({
            username:'admin',
            password:'password1'
        },{
            users:[
                'julian01'
            ],
            name:'SquareLink',
            website:'www.squarelink.nl',
            description:'Dit is een description',
            businessType:'client',
            emailAddresses:[{
                label:'email1',
                emailAddress:'julian@squarelink.nl'
            }],
            phoneNumbers:[{
                label:'tel1',
                phoneNumber:063847983245
            }],
            addresses:[{
                label:'Address1',
                street:'Klein Grachtje',
                number:5,
                zipCode:'8021 JD',
                city:'Zwolle',
                country:'Nederland'
            }]
        },
        [
            {
                username:'julian01',
                password:'password1'
            }
        ])

        await createBusiness({
            username:'admin',
            password:'password1'
        },{
            users:[
                'remy01'
            ],
            name:'Kool Groep',
            website:'www.kg.nl',
            description:'Dit is een description',
            businessType:'client',
            emailAddresses:[{
                label:'email1',
                emailAddress:'remy@kg.nl'
            }],
            phoneNumbers:[{
                label:'tel1',
                phoneNumber:063847983245
            }],
            addresses:[{
                label:'Address1',
                street:'Klein Grachtje',
                number:5,
                zipCode:'8021 JD',
                city:'Zwolle',
                country:'Nederland'
            }]
        },
        [
            {
                username:'remy01',
                password:'password1'
            }
        ])

        await createProject({
            username:'remy01',
            password:'password1'
        },{
            name:'project1',
            description:'project van remy'
        })

        await createProject({
            username:'julian01',
            password:'password1'
        },{
            name:'project2',
            description:'project van julian'
        })

        await createProject({
            username:'julian01',
            password:'password1'
        },{
            name:'project3',
            description:'project van julian'
        })

        await createProject({
            username:'remy01',
            password:'password1'
        },{
            name:'project4',
            description:'project van remy'
        })

        await createProject({
            username:'remy01',
            password:'password1'
        },{
            name:'project5',
            description:'project van remy'
        })

        await createReview({
            username:'julian01',
            password:'password1'
        },{
            business:'Kool Groep',
            rating:4.5,
            comment:'Dit is een top bedrijf, hier do ik snel weer zaken mee!'
        })

        await createReview({
            username:'julian01',
            password:'password1'
        },{
            business:'p&m bv',
            rating:3,
            comment:'Mariska doet het goed maar Peter moet iets harder werken!'
        })

        await createReview({
            username:'julian01',
            password:'password1'
        },{
            business:'p&m bv',
            rating:4.213,
            comment:'Ging wel goed'
        })

        await createShift({
            username:'julian01',
            password:'password1'
        },{
            name:'snoeidienst1',
            description:'Dit is een snoei dienst',
            price:'30,99',
            project:'project2',
            freelancersNeeded:4,
            time:{
                start:Date.now() + (1000 * 60 * 60),
                end:Date.now() + (1000 * 60 * 60 * 8)
            },
            location:{
                start:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                },
                end:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                }
            }
        })

        await createShift({
            username:'remy01',
            password:'password1'
        },{
            name:'snoeidienst2',
            description:'Dit is een tweede snoei dienst',
            price:'15',
            project:'project1',
            freelancersNeeded:2,
            time:{
                start:Date.now() + (1000 * 60 * 60 * 24 * 3),
                end:Date.now() + (1000 * 60 * 60 * 24 * 3 * 8)
            },
            location:{
                start:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                },
                end:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                }
            }
        })

        await createShift({
            username:'remy01',
            password:'password1'
        },{
            name:'snoeidienst3',
            description:'Dit is een 3e snoei dienst',
            price:'60',
            project:'project4',
            freelancersNeeded:7,
            time:{
                start:Date.now() + (1000 * 60 * 60 * 24 * 3),
                end:Date.now() + (1000 * 60 * 60 * 24 * 3 * 8)
            },
            location:{
                start:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                },
                end:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                }
            }
        })

        await createShift({
            username:'remy01',
            password:'password1'
        },{
            name:'snoeidienst4',
            description:'Dit is een 4e snoei dienst',
            price:'40.00',
            project:'project5',
            freelancersNeeded:1,
            time:{
                start:Date.now() + (1000 * 60 * 60 * 24 * 5),
                end:Date.now() + (1000 * 60 * 60 * 24 * 5 * 8)
            },
            location:{
                start:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                },
                end:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                }
            }
        })

        await createShift({
            username:'julian01',
            password:'password1'
        },{
            name:'snoeidienst5',
            description:'Dit is een snoei dienst',
            price:'21.74',
            project:'project3',
            freelancersNeeded:0,
            time:{
                start:Date.now() + (1000 * 60 * 60 * 24 * 5),
                end:Date.now() + (1000 * 60 * 60 * 24 * 5 * 8)
            },
            location:{
                start:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                },
                end:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                }
            }
        })

        await createEvent({
            username:'julian01',
            password:'password1'
        },{
            name:'1 name',
            description:'event from julian',
            project:'project3',
            time:{
                start:1645660801000,
                end:1645680801000
            },
            location:{
                start:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                },
                end:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                }
            }
        })

        await createEvent({
            username:'remy01',
            password:'password1'
        },{
            name:'2 name',
            description:'project van remy',
            project:'project5',
            time:{
                start:1645660801000,
                end:1645680801000
            },
            location:{
                start:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                },
                end:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                }
            }
        })

        await createEvent({
            username:'remy01',
            password:'password1'
        },{
            name:'3 name',
            description:'3 description',
            project:'project1',
            time:{
                start:1645660801000,
                end:1645680801000
            },
            location:{
                start:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                },
                end:{
                    label:'Address1',
                    street:'Klein Grachtje',
                    number:5,
                    zipCode:'8021 JD',
                    city:'Zwolle',
                    country:'Nederland'
                }
            }
        })

        await createTodo({
            username:'remy01',
            password:'password1'
        },{
            name:'todo1',
            description:'description1',
            project:'project1',
            dueDate:1644849878000,
        })

        await createTodo({
            username:'julian01',
            password:'password1'
        },{
            name:'todo1',
            description:'description1',
            project:'project3',
            dueDate:1649849878000,
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

    currentUser = userData.data

    console.log('userdata fetched')

    return

}

async function createFirstAdmin(){

    const newUserDocument = new UserModel()
    newUserDocument.username = 'admin'
    newUserDocument.passwordHash = await encryptPassword('password1')
    newUserDocument.firstName = 'Admin'
    newUserDocument.lastName = 'Admin'
    newUserDocument.email = 'admin@admin.com'
    newUserDocument.roles = ['admin']
    newUserDocument.registeredBy = newUserDocument._id

    await newUserDocument.save()

    console.log('created first user admin')

}

async function createUser(credentials, data){

    await login(credentials.username, credentials.password)

    data.registeredBy = currentUser._id

    const result = await axios({
        method:'post',
        url:url + '/s/v1/user',
        data:data
    })

    console.log('created user', result.data)

}

async function createEvent(credentials, data){

    await login(credentials.username, credentials.password)

    const projectData = await axios({
        url:url + '/s/v1/projects',
        method:'get'
    })

    data.project = projectData.data.find(p => p.name === data.project)._id

    const result = await axios ({
        method:'post',
        url:url + '/s/v1/business/event',
        data:data
    })

    console.log('created event', result.data)

}
