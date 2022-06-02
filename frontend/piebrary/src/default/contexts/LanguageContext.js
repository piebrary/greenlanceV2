import { createContext, useContext } from 'react'

import { UserContext } from './UserContext'

const en = require('../assets/lang/en')()
const nl = require('../assets/lang/nl')()

export const LanguageContext = createContext({})

export default function LanguageContextProvider({ children }){

    const { settings } = useContext(UserContext)
    const languages = { en, nl }

    const contextData = {
        getTranslation,
        addTranslation
    }

    function getTranslation(stringKey){

        return languages[settings.language][stringKey] || stringKey

    }

    function addTranslation(key, translationObject){

        for(let language in languages){

            if(translationObject[language]){

                languages[language][key] = translationObject[language]

            }

        }

    }

    return (
        <LanguageContext.Provider value={contextData}>
            { children }
        </LanguageContext.Provider>
    )
}
