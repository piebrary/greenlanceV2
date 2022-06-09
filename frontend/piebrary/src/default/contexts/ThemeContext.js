import { createContext, useState, useEffect } from 'react'

import { deepCopy } from '../utils/deepCopy'

export const ThemeContext = createContext({})

export default function ThemeContextProvider({ children }){

    const themes = {
        'red-grey':require('../themes/red-grey'),
        'blue-grey':require('../../custom/themes/blue-grey'),
    }

    const [currentTheme, setCurrentTheme] = useState('red-grey')

    function setTheme(themeName){

        if(themes[themeName]){

            for(let cssVar in themes[themeName]){

                document.documentElement.style.setProperty(`--${cssVar}`, themes[themeName][cssVar])

            }

            setCurrentTheme(themeName)

        }

    }

    function getCurrentTheme(){

        return {
            name:currentTheme,
            values:deepCopy(themes[currentTheme])
        }

    }

    function getAvailableThemes(){

        return deepCopy(
            Object.keys(themes).map(t => {
                return {
                    name:t,
                    values:themes[t]
                }
            })
        )

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
