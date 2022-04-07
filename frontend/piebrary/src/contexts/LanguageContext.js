import { createContext, useState, useContext } from 'react'

import { UserContext } from './UserContext'

const en = require('../assets/lang/en')()
const nl = require('../assets/lang/nl')()

export const LanguageContext = createContext({})

export default function LanguageContextProvider({ children }){

    const { settings } = useContext(UserContext)
    const languages = { en, nl }

    const contextData = {
        getLanguage
    }

    function getLanguage(stringKey){

        return languages[settings.language][stringKey]

    }

    return (
        <LanguageContext.Provider value={contextData}>
            { children }
        </LanguageContext.Provider>
    )
}
