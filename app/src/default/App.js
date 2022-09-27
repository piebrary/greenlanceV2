import { useContext, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import { ReactNotifications } from 'react-notifications-component'

// import ScrollToTop from "./components/scrollToTop/ScrollToTop"

import 'animate.css'
import 'react-notifications-component/dist/theme.css'

import LoginView from '../default/views/login/Login'
import RegisterView from '../default/views/register/Register'
import PasswordResetRequestView from '../default/views/passwordResetRequest/PasswordResetRequest'
import PasswordResetView from '../default/views/passwordReset/PasswordReset'
import DashboardView from '../default/views/dashboard/Dashboard'
import ProfileView from '../default/views/profile/Profile'
import FormView from '../default/views/form/Form'
import SettingsView from '../default/views/settings/Settings'
import UsersView from '../default/views/users/Users'
import DocumentationView from '../default/views/documentation/Documentation'
import CalendarView from '../default/views/calendar/Calendar'
import CardView from '../default/views/card/Card'
import ButtonView from '../default/views/button/Button'
import ListView from '../default/views/list/List'
import LanguagesView from '../default/views/languages/Languages'
import GridView from '../default/views/grid/Grid'
import NotificationsView from '../default/views/notifications/Notifications'
import ThemesView from '../default/views/themes/Themes'
import ConfirmView from '../default/views/confirm/Confirm'
import LogoutView from '../default/views/logout/Logout'
import EmailView from '../default/views/email/Email'

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
                            <Route path="/documentation" element={<DocumentationView />} />
                            <Route path="/email" element={<EmailView />} />
                            <Route path="/calendar" element={<CalendarView />} />
                            <Route path="/grid" element={<GridView />} />
                            <Route path="/form" element={<FormView />} />
                            <Route path="/card" element={<CardView />} />
                            <Route path="/button" element={<ButtonView />} />
                            <Route path="/list" element={<ListView />} />
                            <Route path="/notifications" element={<NotificationsView />} />
                            <Route path="/confirm" element={<ConfirmView />} />
                            <Route path="/languages" element={<LanguagesView />} />
                            <Route path="/themes" element={<ThemesView />} />
                            <Route path="/logout" element={<LogoutView />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    : authState === 'failed'
                    ?
                        <Routes>
                            <Route path="/login" element={<LoginView />} />
                            <Route path="/register" element={<RegisterView />} />
                            <Route path="/passwordResetRequest" element={<PasswordResetRequestView />} />
                            <Route path="/passwordReset" element={<PasswordResetView />} />
                            <Route path="*" element={<Navigate to="/login" />} />
                        </Routes>
                    : <p>Loading...</p>
                }
        </div>
    )
}
