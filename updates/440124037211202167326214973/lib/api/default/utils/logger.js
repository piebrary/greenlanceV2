module.exports = (() => {

    function log({ message, data }){

        console.log('New log')

        if(message) console.log('- Message:', message)
        if(data) console.log('- Data:', data)

        console.log('')

    }

    function error({ message, data }){

        console.log('New Error')

        if(message) console.log('- Message:', message)
        if(data) console.log('- Data:', data)

        console.log('')

    }

    return {
        log,
        error
    }

})()
