const moment = require('moment')

module.exports = (() => {

    function log({ message, data }){

        console.log('New log')
        console.log('- Time:', new Date())

        if(message) console.log('- Message:', message)
        if(data) console.log('- Data:', data)

        console.log('')

    }

    function error({ message, data }){

        console.log('New Error')
        console.log('- Time:', new Date())

        if(message) console.log('- Message:', message)
        if(data) console.log('- Data:', data)

        console.log('')

    }

    return {
        log,
        error
    }

})()
