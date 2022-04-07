import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Login from './views/login/Login'

import { AuthenticationContext } from './contexts/AuthenticationContext'
import { UserContext } from './contexts/UserContext'

import styles from './App.module.css'

import './assets/css/reset.css'

export default function App() {

    const { authState } = useContext(AuthenticationContext)
    const { isAdmin } = useContext(UserContext)

    return (
        <div className={styles.app}>
            {
                authState === 'success'
                ?   <Router>
                        <Routes>
                            <Route path="/" element={<Dashboard/>} />
                            <Route path="/settings" element={<Settings/>} />
                            { isAdmin() ? <Route path="/users" element={<Users />} /> : null }
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Router>
                : authState === 'failed'
                ? <Login />
                : <p>Loading...</p>
            }
        </div>
    )
}
