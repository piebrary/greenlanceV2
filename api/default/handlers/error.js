const logger = require('../utils/logger')

module.exports = (status = 500, error) => {

    logger.error({ message:'New error', data:error })

    const response = {
        status,
        body:{}
    }

    if(process.env.NODE_ENV === 'development'){

        response.body.error = error

        // console.log(error)

    }

    if(error.code === 11000 && Object.keys(error.keyValue)[0] === 'email'){

        response.body.message = 'That emailaddress is already taken'
        response.body.data = error.keyValue

    }

    if(error.code === 11000 && Object.keys(error.keyValue)[0] === 'username'){

        response.body.message = 'That username is already taken'
        response.body.data = error.keyValue

    }

    return response

}
