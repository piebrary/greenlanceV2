import { createContext, useState, useEffect, useContext } from 'react'

import { AuthenticationContext } from './AuthenticationContext'

import { getUser, putUser, postMyProfilePicture, getUsers, postUser, delUser} from '../services/UserService'
import { doRegister } from '../services/UserService'

export const UserContext = createContext({})

export default function UserContextProvider({ children }){

    const { authState, setAuthState, authenticate, isAuthenticated, setIsAuthenticated } = useContext(AuthenticationContext)

    const [userData, setUserData] = useState()

    const contextData = {
        hasRole,
        saveUserData,
        userData,
        uploadProfilePicture,
        getUsers,
        postUser,
        delUser,
        refreshUser,
    }

    useEffect(() => {

        if(isAuthenticated) refreshUser()

    }, [isAuthenticated])

    async function refreshUser(){

        try {

            const response = await getUser()

            setUser(response.data)

        } catch (error) {

            console.log(error)

            unsetUser()

        }

    }

    useEffect(() => {

        if(authState === 'failed'){

            unsetUser()

        }

    }, [authState])

    async function setUser(data){

        setUserData(data)

        setAuthState('success')

    }

    async function unsetUser(){

        setUserData(undefined)

        setAuthState('failed')

        setIsAuthenticated(false)

    }

    async function saveUserData(data){

        // upload userdata
        try {

            const response = await putUser(data)

            if(response.data._id === userData.id){

                setUser(response.data)

                // use newPassword if we also changed password, but currentPassword if we didn't change password
                // authenticate forces new login with new token. If it fails, we get redirected to login view
                if(data.currentPassword) authenticate(data.username, data.newPassword || data.currentPassword)

            }

            return response

        } catch (error) {

            console.log(error)

        }

    }

    async function uploadProfilePicture(picture){

        try {

            await postMyProfilePicture(picture)

            const response = await getUser()

            setUser(response.data)

        } catch (error) {

            console.log(error)

        }

    }

    function hasRole(role){

        return userData.roles.includes(role)

    }

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}
