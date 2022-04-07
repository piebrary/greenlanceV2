import axios from 'axios'

export async function getUserData(){

    const options = {
        url:'/api/s/v1/user',
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function putUserCredentials(data){

    const options = {
        url:'/api/s/v1/user/credentials',
        method:'PUT',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function putUserData(data){

    const options = {
        url:'/api/s/v1/user',
        method:'PUT',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}
