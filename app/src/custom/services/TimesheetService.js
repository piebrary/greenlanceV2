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

export async function getAcceptedTimesheets(){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/timesheets/accepted`,
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

export async function updateTimesheetActual(_id, value){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/timesheet/actual/${_id}`,
        method:'PUT',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        data:value
    }

    return await axios(options)

}

export async function acceptTimesheet(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/timesheet/accept/${_id}`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function disputeTimesheet(_id){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/timesheet/dispute/${_id}`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}
