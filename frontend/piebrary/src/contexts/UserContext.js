import { createContext, useState, useEffect, useContext } from 'react'

import { AuthenticationContext } from './AuthenticationContext'

import { getUserData, putUserData, putUserCredentials } from '../services/UserService'

export const UserContext = createContext({})

export default function UserContextProvider({ children }){

    const { authState, setAuthState, authenticate, isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext)

    const [id, setId] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [roles, setRoles] = useState()
    const [settings, setSettings] = useState()
    const [userData, setUserData] = useState()

    const contextData = {
        id,
        username,
        email,
        roles,
        isAdmin,
        isSuperuser,
        isUser,
        settings,
        saveUserData,
        saveUserCredentials,
        userData
    }

    useEffect(() => {

        if(isAuthenticated){

            ;(async () => {

                try {

                    const response = await getUserData()

                    setUser(response.data)

                } catch (error) {

                    console.log(error)

                    unsetUser()

                }

            })()

        }

    }, [isAuthenticated])

    useEffect(() => {

        if(authState === 'failed'){

            unsetUser()

        }

    }, [authState])

    async function setUser(data){

        setUserData(data)

        setId(data._id)
        setUsername(data.username)
        setEmail(data.email)
        setRoles(data.roles)

        setSettings(data.settings)

        setAuthState('success')

    }

    async function unsetUser(){

        setUserData(undefined)

        setId(undefined)
        setUsername(undefined)
        setEmail(undefined)
        setRoles(undefined)

        setSettings(undefined)

        setAuthState('failed')

        setIsAuthenticated(false)

    }

    async function saveUserData(data){

        // upload userdata
        try {

            const response = await putUserData(data)

            setUser(response.data)

        } catch (error) {

            console.log(error)

        }

    }

    async function saveUserCredentials(data){

        // upload userdata
        try {

            await putUserCredentials(data)

            // use newPassword if we also changed password, but currentPassword if we didn't change password
            // authenticate forces new login with new token. If it fails, we get redirected to login view
            authenticate(data.username, data.newPassword || data.currentPassword)

        } catch (error) {

            console.log(error)

        }

    }

    function isAdmin(){

        if(roles) return roles.includes('admin')
        return false

    }

    function isSuperuser(){

        if(roles) return roles.includes('superuser')
        return false

    }

    function isUser(){

        if(roles) return roles.includes('user')
        return false

    }

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}
