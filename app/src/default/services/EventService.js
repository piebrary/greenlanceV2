import axios from 'axios'

export async function getEvents(){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/events`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function getEvent(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/event/${_id}`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function postEvent(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/event`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function putEvent(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/event/${data._id}`,
        method:'PUT',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function delEvent(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/event/${_id}`,
        method:'DELETE',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}
