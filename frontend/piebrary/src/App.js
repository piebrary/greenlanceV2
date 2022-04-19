import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Login from './views/login/Login'
import Dashboard from './views/dashboard/Dashboard'
import Form from './views/form/Form'
import Settings from './views/settings/Settings'
import Users from './views/users/Users'

import { AuthenticationContext } from './contexts/AuthenticationContext'
import { UserContext } from './contexts/UserContext'

import config from './config/config'

import './assets/css/reset.css'

import styles from './App.module.css'

export default function App() {

    import(`./themes/${config.THEME}.css`)

    const { authState } = useContext(AuthenticationContext)
    const { isAdmin } = useContext(UserContext)

    return (
        <div>
            {
                authState === 'success'
                ?   <Router>
                        <Routes>
                            <Route path="/" element={<Dashboard/>} />
                            <Route path="/form" element={<Form/>} />
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
