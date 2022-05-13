import { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Login from './default/views/login/Login'
import Dashboard from './default/views/dashboard/Dashboard'
import Profile from './default/views/profile/Profile'
import Form from './default/views/form/Form'
import Settings from './default/views/settings/Settings'
import Users from './default/views/users/Users'
import Documentation from './default/views/documentation/Documentation'
import Calendar from './default/views/calendar/Calendar'
import Card from './default/views/card/Card'
import Button from './default/views/button/Button'
import Languages from './default/views/languages/Languages'
import Grid from './default/views/grid/Grid'

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
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/settings" element={<Settings />} />
                            { isAdmin() ? <Route path="/users" element={<Users />} /> : null }
                            <Route path="/documentation" element={<Documentation />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/grid" element={<Grid />} />
                            <Route path="/form" element={<Form />} />
                            <Route path="/card" element={<Card />} />
                            <Route path="/button" element={<Button />} />
                            <Route path="/languages" element={<Languages />} />
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
