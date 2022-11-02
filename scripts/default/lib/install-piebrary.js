const uuid = require('uuid')
const readline = require('readline/promises')
const { stdin: input, stdout: output } = require('process')
const fs = require('fs/promises')

;(async () => {

    const rl = readline.createInterface({
        input,
        output
    })

    try {

        const API_SECRET = uuid.v4()

        console.log('Welcome to the PieBrary installation file.')
        console.log('This file will guide you through the installation and set all necessary variables.')

        const APP_NAME = await rl.question(`What is the name of the app? `)
        const CLIENT_URL = await rl.question(`On which URL will the app be hosted? `)
        const NO_REPLY_EMAIL = await rl.question(`What will be the standard email address for no reply emails (for example for user registration, forgot password etc)? `)
        const API_PORT = await rl.question(`On which portnumber should the api run? `)
        const API_PREFIX = await rl.question(`What should be the prefix for the api? `)
        const API_ENABLE_PUBLIC_REGISTRATION = await rl.question(`Should user registration be publicly available (true) or handled by an admin (false)? `)
        const API_TOKEN_LIFETIME = await rl.question(`What should be lifetime of the login token? `)
        const DB_NAME = await rl.question(`Name of the database? `)
        const DB_USERNAME = await rl.question(`Username of the db user? `)
        const DB_PASSWORD = await rl.question(`Password of the db user? `)
        const DB_URL = await rl.question(`URL for the database? `)
        const DB_NAME_DEV = await rl.question(`Name of the development database? `)
        const DB_USERNAME_DEV = await rl.question(`Username of the development db user? `)
        const DB_PASSWORD_DEV = await rl.question(`Password of the development db user? `)
        const DB_URL_DEV = await rl.question(`URL for the development database? `)
        const ENVIRONMENT = await rl.question(`Environment (development or production)? `)

        await fs.writeFile('../../../app/.env', `REACT_APP_NAME=${APP_NAME}\n`, { flag:'w' })
        await fs.appendFile('../../../app/.env', `REACT_APP_CLIENT_URL=${CLIENT_URL}\n`)
        await fs.appendFile('../../../app/.env', `REACT_APP_NO_REPLY_EMAIL=${NO_REPLY_EMAIL}\n`)
        await fs.appendFile('../../../app/.env', `REACT_APP_API_PORT=${API_PORT}\n`)
        await fs.appendFile('../../../app/.env', `REACT_APP_API_PREFIX=${API_PREFIX}\n`)
        await fs.appendFile('../../../app/.env', `REACT_APP_ENABLE_PUBLIC_REGISTRATION=${API_ENABLE_PUBLIC_REGISTRATION}\n`)
        await fs.appendFile('../../../app/.env', `REACT_APP_ENVIRONMENT=${ENVIRONMENT}\n`)

        await fs.writeFile('../../../api/.env', `APP_NAME=${APP_NAME}\n`, { flag:'w' })
        await fs.appendFile('../../../api/.env', `CLIENT_URL=${CLIENT_URL}\n`)
        await fs.appendFile('../../../api/.env', `API_PORT=${API_PORT}\n`)
        await fs.appendFile('../../../api/.env', `API_PREFIX=${API_PREFIX}\n`)
        await fs.appendFile('../../../api/.env', `API_SECRET=${API_SECRET}\n`)
        await fs.appendFile('../../../api/.env', `API_TOKEN_LIFETIME=${API_TOKEN_LIFETIME}\n`)
        await fs.appendFile('../../../api/.env', `API_ENABLE_PUBLIC_REGISTRATION=${API_ENABLE_PUBLIC_REGISTRATION}\n`)
        await fs.appendFile('../../../api/.env', `DB_NAME=${DB_NAME}\n`)
        await fs.appendFile('../../../api/.env', `DB_USERNAME=${DB_USERNAME}\n`)
        await fs.appendFile('../../../api/.env', `DB_PASSWORD=${DB_PASSWORD}\n`)
        await fs.appendFile('../../../api/.env', `DB_URL=${DB_URL}\n`)
        await fs.appendFile('../../../api/.env', `DB_NAME_DEV=${DB_NAME_DEV}\n`)
        await fs.appendFile('../../../api/.env', `DB_USERNAME_DEV=${DB_USERNAME_DEV}\n`)
        await fs.appendFile('../../../api/.env', `DB_PASSWORD_DEV=${DB_PASSWORD_DEV}\n`)
        await fs.appendFile('../../../api/.env', `DB_URL_DEV=${DB_URL_DEV}\n`)
        await fs.appendFile('../../../api/.env', `ENVIRONMENT=${ENVIRONMENT}\n`)

        console.log(`Successfully installed ${APP_NAME} with the help of PieBrary`)

        process.exit()

    } catch (error) {

        console.log(error)

    }

})()
