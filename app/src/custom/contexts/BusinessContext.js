import { createContext, useContext, useEffect, useState } from 'react'

import { AuthenticationContext } from '../../default/contexts/AuthenticationContext'
import { UserContext } from '../../default/contexts/UserContext'

import { getBusiness } from '../services/BusinessService'

export const BusinessContext = createContext({})

export default function BusinessContextProvider({ children }){

    const { authState } = useContext(AuthenticationContext)
    const { hasRole } = useContext(UserContext)

    const [ businessData, setBusinessData] = useState([])

    const contextData = {
        businessData
    }

    useEffect(() => {

        if(authState === 'success' && hasRole('business')){

            ;(async () => {

                try {

                    const response = await getBusiness()

                    setBusinessData(response.data)

                } catch (error) {

                    console.log(error)

                }

            })()

        }

    }, [authState])

    return (
        <BusinessContext.Provider value={contextData}>
            { children }
        </BusinessContext.Provider>
    )
}
