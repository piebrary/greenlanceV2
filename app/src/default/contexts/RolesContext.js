import { createContext, useContext, useEffect, useState } from 'react'

import { AuthenticationContext } from './AuthenticationContext'
import { UserContext } from './UserContext'

import { getRoles } from '../services/RolesService'

import { deepCopy } from '../utils/deepCopy'

export const RolesContext = createContext({})

export default function RolesContextProvider({ children }){

    const { authState } = useContext(AuthenticationContext)
    const { roles } = useContext(UserContext)

    const [ availableRoles, setAvailableRoles] = useState([])

    const contextData = {
        getAvailableRoles,
        getAvailableRolesAndPermissions,
        hasRole,
        getPermissionsForRole,
        hasPermissionFor
    }

    useEffect(() => {

        if(authState === 'success'){

            ;(async () => {

                try {

                    const response = await getRoles()

                    console.log(response)

                    setAvailableRoles(response.data)

                } catch (error) {

                    console.log(error)

                }

            })()

        }

    }, [authState])

    function getAvailableRoles(){

        return availableRoles.map(ar => ar.name)

    }

    function getAvailableRolesAndPermissions(){

        return deepCopy(availableRoles)

    }

    function hasRole(role){

        return roles.includes(role)

    }

    function getPermissionsForRole(role){

        return roles
            .filter(role => role.name === role)
            .permissions

    }

    function hasPermissionFor(role, permission){

        return roles
            .filter(role => role.name === role)
            .permissions
            .includes(permission)

    }

    return (
        <RolesContext.Provider value={contextData}>
            { children }
        </RolesContext.Provider>
    )
}
