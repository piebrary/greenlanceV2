import axios from 'axios'

export async function doAuthenticate(username, password){

    const options = {
        url:'/api/login',
        method:'POST',
        data:{
            username,
            password
        }
    }

    return await axios(options)

}

export async function doRegister(username, password, email){

    const options = {
        url:'/api/v1/s/user',
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data:{
            username,
            password,
            email
        }
    }

    return await axios(options)

}
