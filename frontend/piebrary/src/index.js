import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import AuthenticationContextProvider from './contexts/AuthenticationContext'
import UserContextProvider from './contexts/UserContext'
import LanguageContextProvider from './contexts/LanguageContext'

import './index.css'

import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <React.StrictMode>
        <AuthenticationContextProvider>
            <UserContextProvider>
                <LanguageContextProvider>
                    <App />
                </LanguageContextProvider>
            </UserContextProvider>
        </AuthenticationContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
