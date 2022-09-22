import axios from 'axios'

export async function doAuthenticate(username, password){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/login`,
        method:'POST',
        data:{
            username,
            password
        }
    }

    return await axios(options)

}

export async function register(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/register`,
        method:'POST',
        data
    }

    return await axios(options)

}

export async function passwordResetRequest(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/passwordResetRequest`,
        method:'POST',
        data
    }

    return await axios(options)

}

export async function passwordReset(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/passwordReset`,
        method:'POST',
        data
    }

    return await axios(options)

}
