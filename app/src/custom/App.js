import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'

import { ReactNotifications } from 'react-notifications-component'

// import ScrollToTop from "./components/scrollToTop/ScrollToTop"

import 'animate.css'
import 'react-notifications-component/dist/theme.css'

import LoginView from '../custom/views/login/Login'
import PasswordResetView from '../custom/views/passwordReset/PasswordReset'
import DashboardView from '../custom/views/dashboard/Dashboard'
import ProfileView from '../custom/views/profile/Profile'
import SettingsView from '../custom/views/settings/Settings'
import UsersView from '../custom/views/users/Users'
import CalendarView from '../custom/views/calendar/Calendar'
import LogoutView from '../default/views/logout/Logout'

import { AuthenticationContext } from '../default/contexts/AuthenticationContext'
import { UserContext } from '../default/contexts/UserContext'
import { VisualsContext } from '../default/contexts/VisualsContext'

import config from '../config/config'

import '../default/assets/css/reset.css'

import styles from './App.module.css'

export default function App() {

    const { authState } = useContext(AuthenticationContext)
    const { isAdmin } = useContext(UserContext)
    const { setTheme, currentTheme } = useContext(VisualsContext)

    const { pathname } = useLocation()

    useEffect(() => {

        window.scrollTo(0, 0)

    }, [pathname])

    return (
        <div id={'App'} className={styles.app}>
            <ReactNotifications
                isMobile={currentTheme?.values?.layoutBreakpoint ? true : false}
                breakpoint={currentTheme?.values?.layoutBreakpoint}
                />
            {
                authState === 'success'
                ?
                    <Routes>
                            <Route path="/" element={<DashboardView />} />
                            <Route path="/profile" element={<ProfileView />} />
                            <Route path="/settings" element={<SettingsView />} />
                            { isAdmin() && <Route path="/users" element={<UsersView />} /> }
                            <Route path="/calendar" element={<CalendarView />} />
                            <Route path="/logout" element={<LogoutView />} />
                            <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                : authState === 'failed'
                ?
                    <Routes>
                        <Route path="/login" element={<LoginView />} />
                        <Route path="/passwordReset" element={<PasswordResetView />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                : <></>
            }
        </div>
    )
}
