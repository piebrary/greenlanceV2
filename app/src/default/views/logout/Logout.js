import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import styles from './Logout.module.css'

export default function LogoutView(){

    const { logout } = useContext(AuthenticationContext)

    const nav = useNavigate()

    useEffect(() => {

        logout()

        nav('/')

    }, [])

    return (
        <>
            You are being logged out
        </>
    )
}
