import { createContext, useContext } from 'react'

import { UserContext } from './UserContext'

import { en } from '../assets/lang/en'
import { nl } from '../assets/lang/nl'

export const LanguageContext = createContext({})

export default function LanguageContextProvider({ children }){

    const { settings } = useContext(UserContext)
    const languages = { en:en(), nl:nl() }

    const contextData = {
        applyTranslation,
        createTranslation
    }

    function applyTranslation(stringKey, language){

        console.log(stringKey, language, languages, settings)

        if(languages[language]) return languages[language][stringKey] || stringKey

        return languages[settings.language][stringKey] || stringKey

    }

    function createTranslation(key, translationObject){

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
