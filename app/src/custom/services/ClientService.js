import axios from 'axios'

export async function getClient(){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/client`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}
