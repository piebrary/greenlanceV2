import { createContext, useState, useEffect } from 'react'

import config from '../../config/config'

import { deepCopy } from '../utils/deepCopy'

export const ThemeContext = createContext({})

export default function ThemeContextProvider({ children }){

    const themes = {
        'default':require('../../default/themes/default'),
        'red':require('../../default/themes/red'),
        'green':require('../../default/themes/green'),
    }

    const [currentTheme, setCurrentTheme] = useState({
        name:'default',
        values:deepCopy(themes['default'])
    })

    useEffect(() => {

        if(config?.THEME && themes[config.THEME]) setTheme(config.THEME)

    }, [])

    function setTheme(themeName){

        if(themes[themeName]){

            for(let cssVar in themes[themeName]){

                document.documentElement.style.setProperty(`--${cssVar}`, themes[themeName][cssVar])

            }

            setCurrentTheme({
                name:themeName,
                values:deepCopy(themes[currentTheme])
            })

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
        currentTheme,
        getAvailableThemes,
    }

    return (
        <ThemeContext.Provider value={contextData}>
            { children }
        </ThemeContext.Provider>
    )
}
