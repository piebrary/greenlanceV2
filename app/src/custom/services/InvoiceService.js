import axios from 'axios'

export async function getInvoicePdf(name){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/invoice/pdf/${name}`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        responseType:'blob'
    }

    return await axios(options)

}

export async function getInvoices(){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/invoices`,
        method:'GET',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        }
    }

    return await axios(options)

}

export async function createInvoice(data){

    const options = {
        url:`${process.env.REACT_APP_API_PREFIX}/v1/s/invoice`,
        method:'POST',
        headers: {
            Authorization:'Bearer ' + localStorage.getItem(`${process.env.REACT_APP_CLIENT_URL}_token`),
            'Content-Type': 'application/json'
        },
        data
    }

    return await axios(options)

}
