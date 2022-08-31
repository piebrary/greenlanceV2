import axios from 'axios'
import FormData from 'form-data'

export async function getUser(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/user${_id ? '/' + _id : ''}`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function getUsers(){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/users`,
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
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/user`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function putUser(data){

    console.log(data)

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/user${data._id ? '/' + data._id : ''}`,
        method:'PUT',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

// export async function putOtherUser(data){
//
//     const options = {
//         url:'/api/v1/s/user/' + data._id,
//         method:'PUT',
//         headers: {
//             Authorization:'Bearer ' + localStorage.getItem('token'),
//             'Content-Type': 'application/json'
//         },
//         data
//     }
//
//     return await axios(options)
//
// }

export async function delUser(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/user/${_id}`,
        method:'DELETE',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function postMyProfilePicture(file){

    const form = new FormData()

    form.append('picture', file)

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/user/picture/`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
        },
        data:form
    }

    return await axios(options)

}
