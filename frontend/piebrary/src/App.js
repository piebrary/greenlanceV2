import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Login from './default/views/login/Login'
import Dashboard from './default/views/dashboard/Dashboard'
import Profile from './default/views/profile/Profile'
import Form from './default/views/form/Form'
import Settings from './default/views/settings/Settings'
import Users from './default/views/users/Users'

import { AuthenticationContext } from './default/contexts/AuthenticationContext'
import { UserContext } from './default/contexts/UserContext'

import config from './default/config/config'

import './default/assets/css/reset.css'

import styles from './App.module.css'

export default function App() {

    import(`./default/themes/${config.THEME}.css`)

    const { authState } = useContext(AuthenticationContext)
    const { isAdmin } = useContext(UserContext)

    return (
        <div>
            {
                authState === 'success'
                ?   <Router>
                        <Routes>
                            <Route path="/" element={<Dashboard/>} />
                            <Route path="/profile" element={<Profile/>} />
                            <Route path="/settings" element={<Settings/>} />
                            <Route path="/form" element={<Form/>} />
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
