require('dotenv').config({ path:'./.env' })

if(process.argv[2] !== 'development'){

    process.env.NODE_ENV = 'production'

} else {

    process.env.NODE_ENV = 'development'

}

console.log(process.env.NODE_ENV)

try {

    require('./custom/server/index.js')()

} catch {

    require('./default/server/index.js')()

}
