import { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext({})

export default function ThemeContextProvider({ children }){

    const themes = {
        'red-grey':require('../themes/red-grey'),
        'blue-grey':require('../../custom/themes/blue-grey'),
    }

    const [currentTheme, setCurrentTheme] = useState()

    function setTheme(themeName){

        if(themes[themeName]){

            for(let cssVar in themes[themeName]){

                document.documentElement.style.setProperty(`--${cssVar}`, themes[themeName][cssVar])

            }

            setCurrentTheme(themeName)

        }

    }

    function getCurrentTheme(){

        return currentTheme

    }

    function getAvailableThemes(){

        return Object.keys(themes)

    }

    const contextData = {
        setTheme,
        getCurrentTheme,
        getAvailableThemes,
    }

    return (
        <ThemeContext.Provider value={contextData}>
            { children }
        </ThemeContext.Provider>
    )
}
