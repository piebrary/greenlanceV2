import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom'

import { ReactNotifications } from 'react-notifications-component'

// import ScrollToTop from "./components/scrollToTop/ScrollToTop"

import 'animate.css'
import 'react-notifications-component/dist/theme.css'

import FreelancerContextProvider from './contexts/FreelancerContext'
import BusinessContextProvider from './contexts/BusinessContext'

import LoginView from '../custom/views/login/Login'
import PasswordResetView from '../custom/views/passwordReset/PasswordReset'
import DashboardView from '../custom/views/dashboard/Dashboard'
import ProfileView from '../custom/views/profile/Profile'
import BusinessProfileView from '../custom/views/businessProfile/BusinessProfile'
import SettingsView from '../custom/views/settings/Settings'
import UsersView from '../custom/views/users/Users'
import CalendarView from '../custom/views/calendar/Calendar'
import LogoutView from '../default/views/logout/Logout'
import ShiftsView from '../custom/views/shifts/Shifts'
import TimesheetsView from '../custom/views/timesheets/Timesheets'
import InvoicesView from '../custom/views/invoices/Invoices'
import FinancialsView from '../custom/views/financials/Financials'
import ProjectsView from '../custom/views/projects/Projects'
import FaqView from '../custom/views/faq/Faq'
import ContactView from '../custom/views/contact/Contact'

import { AuthenticationContext } from '../default/contexts/AuthenticationContext'
import { UserContext } from '../default/contexts/UserContext'
import { VisualsContext } from '../default/contexts/VisualsContext'

import '../default/assets/css/reset.css'

import styles from './App.module.css'

export default function App() {

    const { authState } = useContext(AuthenticationContext)
    const { hasRole } = useContext(UserContext)
    const { setTheme, currentTheme } = useContext(VisualsContext)

    const { pathname } = useLocation()

    useEffect(() => {

        window.scrollTo(0, 0)

    }, [pathname])

    return (
        <FreelancerContextProvider>
            <BusinessContextProvider>
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
                                    { (hasRole('freelancer') || hasRole('business')) && <Route path="/calendar" element={<CalendarView />} /> }
                                    { (hasRole('freelancer') || hasRole('business')) && <Route path="/shifts" element={<ShiftsView />} /> }
                                    { (hasRole('freelancer') || hasRole('business')) && <Route path="/timesheets" element={<TimesheetsView />} /> }
                                    { (hasRole('freelancer') || hasRole('business')) && <Route path="/invoices" element={<InvoicesView />} /> }
                                    { (hasRole('freelancer') || hasRole('business')) && <Route path="/financials" element={<FinancialsView />} /> }
                                    <Route path="/business-profile" element={<BusinessProfileView />} />
                                    { hasRole('business') && <Route path="/projects" element={<ProjectsView />} /> }
                                    <Route path="/profile" element={<ProfileView />} />
                                    <Route path="/settings" element={<SettingsView />} />
                                    { hasRole('admin') && <Route path="/users" element={<UsersView />} /> }
                                    <Route path="/faq" element={<FaqView />} />
                                    <Route path="/contact" element={<ContactView />} />
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
            </BusinessContextProvider>
        </FreelancerContextProvider>
    )
}
