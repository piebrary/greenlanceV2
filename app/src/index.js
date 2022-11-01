import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import './index.css'

import reportWebVitals from './reportWebVitals'

let App,
    AuthenticationContextProvider,
    UserContextProvider,
    LanguageContextProvider,
    VisualsContextProvider,
    RolesContextProvider

try { App = require('./custom/App').default } catch { App = require('./default/App').default }
try { AuthenticationContextProvider = require('./custom/contexts/AuthenticationContext').default } catch { AuthenticationContextProvider = require('./default/contexts/AuthenticationContext').default }
try { UserContextProvider = require('./custom/contexts/UserContext').default } catch { UserContextProvider = require('./default/contexts/UserContext').default }
try { LanguageContextProvider = require('./custom/contexts/LanguageContext').default } catch { LanguageContextProvider = require('./default/contexts/LanguageContext').default }
try { VisualsContextProvider = require('./custom/contexts/VisualsContext').default } catch { VisualsContextProvider = require('./default/contexts/VisualsContext').default }
try { RolesContextProvider = require('./custom/contexts/RolesContext').default } catch { RolesContextProvider = require('./default/contexts/RolesContext').default }

createRoot(
    document.getElementById('root')
).render(
    <React.StrictMode>
        <AuthenticationContextProvider>
            <UserContextProvider>
                <VisualsContextProvider>
                    <LanguageContextProvider>
                            <RolesContextProvider>
                            <Router>
                                <App />
                            </Router>
                        </RolesContextProvider>
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
