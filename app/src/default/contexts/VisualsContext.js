import { createContext, useState, useEffect, useContext } from 'react'

import { ConfigContext } from './ConfigContext'

import { deepCopy } from '../../default/utils/deepCopy'

export const VisualsContext = createContext({})

export default function VisualsContextProvider({ children }){

    const { AVAILABLE_THEMES, DEFAULT_THEME } = useContext(ConfigContext)

    const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME)
    const [darkmode, setDarkmode] = useState(false)

    const [themes, setThemes] = useState({})
    const [defaultTheme, setDefaultTheme] = useState({})

    useEffect(() => {

        const themesContainer = {
            default:require(`../../default/assets/themes/default`).default
        }

        for(let theme of AVAILABLE_THEMES){

            try {

                themesContainer[theme] = require(`../../custom/assets/themes/${theme}`).default

            } catch {

                themesContainer[theme] = require(`../../default/assets/themes/${theme}`).default

            }

        }

        setThemes(themesContainer)

    }, [])

    function changeTheme(name){

        if(themes[name]){

            setCurrentTheme(name)

        }

    }

    function toggleDarkmode(){

        setDarkmode(!darkmode)

    }

    useEffect(() => {

        if(
            currentTheme === undefined
            || themes[currentTheme] === undefined
        ){

            return

        }

        const themeProperties = themes[currentTheme]({ darkmode })

        for(let property in themeProperties){

            document.documentElement.style.setProperty(`--${property}`, themeProperties[property])

        }

    }, [themes, currentTheme, darkmode])

    function getAvailableThemes(){

        return deepCopy(AVAILABLE_THEMES)

    }

    function getCurrentTheme(){

        return deepCopy(themes[currentTheme]({ darkmode }))

    }

    function getDarkmode(){

        return darkmode

    }

    function disableScroll(){

        document.body.style.overflow = 'hidden'

    }

    function enableScroll(){

        document.body.style.overflow = 'auto'

    }

    const contextData = {
        changeTheme,
        toggleDarkmode,
        getDarkmode,
        getAvailableThemes,
        getCurrentTheme,
        disableScroll,
        enableScroll,
    }

    return (
        <VisualsContext.Provider value={contextData}>
            { children }
        </VisualsContext.Provider>
    )
}
