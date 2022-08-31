import axios from 'axios'

export async function sendEmail(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/email`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}
