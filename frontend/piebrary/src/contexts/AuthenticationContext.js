import { createContext, useState, useEffect } from 'react'

import { doAuthenticate } from '../services/AuthenticationService'

export const AuthenticationContext = createContext({})

export default function AuthenticationContextProvider({ children }){

    const [authState, setAuthState] = useState('pending')
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const contextData = {
        authState,
        setAuthState,
        isAuthenticated,
        setIsAuthenticated,
        authenticate,
        logout
    }

    useEffect(() => {

        const token = localStorage.getItem('token')

        if(!token){

            setAuthState('failed')

            setIsAuthenticated(false)

        }

        if(token){

            setIsAuthenticated(true)

        }

    }, [])

    async function authenticate(username, password){

        try {

            const authResult = await doAuthenticate(username, password)

            localStorage.setItem('token', authResult.headers.jwt)

            setIsAuthenticated(true)


        } catch (error) {

            console.log(error)

            setAuthState('failed')

            setIsAuthenticated(false)

        }
    }

    function logout(){

        localStorage.removeItem('token')
        setAuthState('failed')
        setIsAuthenticated(false)

    }

    return (
        <AuthenticationContext.Provider value={contextData}>
            {children}
        </AuthenticationContext.Provider>
    )
}
