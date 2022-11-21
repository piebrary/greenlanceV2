import axios from 'axios'

export async function getTimesheets(){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/timesheets`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function getTimesheet(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/timesheets/${_id}`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}
