import axios from 'axios'

export async function sendEmail(data){

    const options = {
        url:`/api/v1/s/email`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}
