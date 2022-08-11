module.exports = (status = 500, error) => {

    const response = { status }

    if(error){

        response.body = error

    }

    return response

}
