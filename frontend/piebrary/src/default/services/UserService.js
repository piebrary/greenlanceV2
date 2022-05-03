import axios from 'axios'
import FormData from 'form-data'

export async function getMyUserData(){

    const options = {
        url:'/api/v1/s/user',
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function postUser(data){

    const options = {
        url:'/api/v1/s/user',
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function putMyUserData(data){

    const options = {
        url:'/api/v1/s/user',
        method:'PUT',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function putOtherUserData(data){

    const options = {
        url:'/api/v1/s/user/' + data._id,
        method:'PUT',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function getProfilePicture(filename){


    const options = {
        url:`http://localhost:46372/public/images/profile/` + filename,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Response-Type': 'blob'
        }
    }

    return await axios(options)

}

export async function postMyProfilePicture(file){

    const form = new FormData()

    form.append('picture', file)

    const options = {
        url:'/api/v1/s/user/picture/',
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
        },
        data:form
    }

    return await axios(options)

}

export async function getUsers(){

    const options = {
        url:'/api/v1/s/users',
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}
