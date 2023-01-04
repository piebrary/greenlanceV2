import { createContext, useContext, useEffect, useState } from 'react'

import { AuthenticationContext } from '../../default/contexts/AuthenticationContext'
import { UserContext } from '../../default/contexts/UserContext'

import { getClient } from '../services/ClientService'

export const ClientContext = createContext({})

export default function ClientContextProvider({ children }){

    const { authState } = useContext(AuthenticationContext)
    const { userData, hasRole } = useContext(UserContext)

    const [ clientData, setClientData] = useState([])

    const contextData = {
        clientData
    }

    useEffect(() => {

        if(authState === 'success' && hasRole('client')) refreshClient()
        if(authState === 'failed') setClientData()

    }, [authState, userData])

    async function refreshClient(){

        try {

            const response = await getClient()

            setClientData(response.data)

        } catch (error) {

            console.log(error)

            setClientData()

        }

    }

    return (
        <ClientContext.Provider value={contextData}>
            { children }
        </ClientContext.Provider>
    )
}
