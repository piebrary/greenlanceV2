import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import App from './default/App'

import AuthenticationContextProvider from './default/contexts/AuthenticationContext'
import UserContextProvider from './default/contexts/UserContext'
import LanguageContextProvider from './default/contexts/LanguageContext'
import VisualsContextProvider from './default/contexts/VisualsContext'

import './index.css'

import reportWebVitals from './reportWebVitals'

createRoot(
    document.getElementById('root')
).render(
    <React.StrictMode>
        <AuthenticationContextProvider>
            <UserContextProvider>
                <VisualsContextProvider>
                    <LanguageContextProvider>
                        <Router>
                            <App />
                        </Router>
                    </LanguageContextProvider>
                </VisualsContextProvider>
            </UserContextProvider>
        </AuthenticationContextProvider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
