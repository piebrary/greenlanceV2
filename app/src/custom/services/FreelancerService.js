import axios from 'axios'

export async function getFreelancer(){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/freelancer`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function getFreelancers(){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/freelancers/all`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function getFreelancersById(ids){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/freelancers`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        data:{
            ids
        }
    }

    return await axios(options)

}
