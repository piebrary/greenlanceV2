import { createContext, useContext, useEffect, useState } from 'react'

import { AuthenticationContext } from '../../default/contexts/AuthenticationContext'
import { UserContext } from '../../default/contexts/UserContext'

import { getFreelancer } from '../services/FreelancerService'

export const FreelancerContext = createContext({})

export default function FreelancerContextProvider({ children }){

    const { authState } = useContext(AuthenticationContext)
    const { userData, hasRole } = useContext(UserContext)

    const [ freelancerData, setFreelancerData] = useState()

    const contextData = {
        freelancerData
    }

    useEffect(() => {

        if(authState === 'success' && hasRole('freelancer')) refreshFreelancer()
        if(authState === 'failed') setFreelancerData()

    }, [authState, userData])

    useEffect(() => {

        console.log(freelancerData, 'is removed')
    }, [freelancerData])

    async function refreshFreelancer(){

        try {

            const response = await getFreelancer()

            setFreelancerData(response.data)
             console.log('test')

        } catch (error) {

            console.log(error)

            setFreelancerData()

        }

    }

    return (
        <FreelancerContext.Provider value={contextData}>
            { children }
        </FreelancerContext.Provider>
    )
}
