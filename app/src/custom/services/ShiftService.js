import axios from 'axios'

export async function getShifts(){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/shifts`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function getShift(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/shift/${_id}`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function postShift(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/shift`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function putShift(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/shift/${data._id}`,
        method:'PUT',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function delShift(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/shift/${_id}`,
        method:'DELETE',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function applyForShift(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/shift/apply/${_id}`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function withdrawFromShift(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/shift/withdraw/${_id}`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function acceptForShift(shiftId, freelancerId){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/shift/accept`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        params:{
            shiftId,
            freelancerId
        }
    }

    return await axios(options)

}

export async function declineForShift(shiftId, freelancerId){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/shift/decline`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        params:{
            shiftId,
            freelancerId
        }
    }

    return await axios(options)

}
