require('dotenv').config({ path:'./.env' })

try {

    require('./custom/server/index.js')()

} catch {

    require('./default/server/index.js')()

}
