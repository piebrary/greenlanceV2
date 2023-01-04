import axios from 'axios'

export async function createBusiness(data){

    console.log(data)

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/business`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}

export async function connectToBusiness(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/business`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}
