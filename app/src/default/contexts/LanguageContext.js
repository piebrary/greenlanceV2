import { createContext, useContext, useState, useEffect } from 'react'

import { ConfigContext } from './ConfigContext'
import { UserContext } from './UserContext'

export const LanguageContext = createContext({})

export default function LanguageContextProvider({ children }){

    const { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE } = useContext(ConfigContext)
    const { settings } = useContext(UserContext)

    const [languages, setLanguages] = useState({})

    useEffect(() => {

        const langs = {}

        for(let lang of AVAILABLE_LANGUAGES){

            try {

                const defaultLang = require(`../../default/assets/lang/${lang}`).default()
                const customLang = require(`../../custom/assets/lang/${lang}`).default()

                const newLang = Object.assign(defaultLang, customLang)

                langs[lang] = newLang

            } catch {

                langs[lang] = require(`../../default/assets/lang/${lang}`).default()

            }

        }

        setLanguages(langs)

    }, [])

    const contextData = {
        applyTranslation,
        createTranslation
    }

    function applyTranslation(accessor){

        if(
            languages
            && settings
            && settings.language
            && languages[settings.language]
            && languages[settings.language][accessor]
        ) return languages[settings.language][accessor]

        return accessor

    }

    function createTranslation(accessor, translations){

        for(let lang in languages){

            if(translations[lang]){

                languages[lang][accessor] = translations[lang]

            }

        }

    }

    return (
        <LanguageContext.Provider value={contextData}>
            { children }
        </LanguageContext.Provider>
    )
}
