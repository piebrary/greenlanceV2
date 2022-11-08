import { createContext, useContext, useEffect, useState } from 'react'

import { AuthenticationContext } from '../../default/contexts/AuthenticationContext'
import { UserContext } from '../../default/contexts/UserContext'

import { getFreelancer } from '../services/FreelancerService'

export const FreelancerContext = createContext({})

export default function FreelancerContextProvider({ children }){

    const { authState } = useContext(AuthenticationContext)
    const { hasRole } = useContext(UserContext)

    const [ freelancerData, setFreelancerData] = useState([])

    const contextData = {
        freelancerData
    }

    useEffect(() => {

        if(authState === 'success' && hasRole('freelancer')){

            ;(async () => {

                try {

                    const response = await getFreelancer()

                    setFreelancerData(response.data)

                } catch (error) {

                    console.log(error)

                }

            })()

        }

    }, [authState])

    return (
        <FreelancerContext.Provider value={contextData}>
            { children }
        </FreelancerContext.Provider>
    )
}
