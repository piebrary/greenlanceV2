import { createContext, useState, useEffect } from 'react'

import config from '../../config/config'

import { deepCopy } from '../../default/utils/deepCopy'

export const VisualsContext = createContext({})

export default function VisualsContextProvider({ children }){

    const themes = {
        'grey':require('../../default/themes/grey'),
        'red':require('../../default/themes/red'),
        'green':require('../../default/themes/green'),
    }

    const [currentTheme, setCurrentTheme] = useState({
        name:'grey',
        values:deepCopy(themes['grey'])
    })

    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {

        if(config?.THEME && themes[config.THEME]){

            setTheme(config.THEME)

        }

    }, [])

    function getCurrentTheme(){

        return deepCopy(currentTheme)

    }

    function setTheme(themeName){

        const mode = isDarkMode ? 'dark' : 'light'
        const vars = themes[themeName][mode]()

        if(vars){

            setCurrentTheme({
                name:themeName,
                values:deepCopy(themes[themeName])
            })

        }

    }

    useEffect(() => {

        const mode = isDarkMode ? 'dark' : 'light'
        const vars = themes[currentTheme.name][mode]()

        if(vars){

            for(let cssVar in vars){

                document.documentElement.style.setProperty(`--${cssVar}`, vars[cssVar])

            }

        }

    }, [currentTheme, isDarkMode])

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

    function goToggleDarkMode(){

        setIsDarkMode(!isDarkMode)

        setTheme(currentTheme.name)

    }

    function getIsDarkMode(){

        return isDarkMode

    }

    const contextData = {
        setTheme,
        getCurrentTheme,
        getAvailableThemes,
        goToggleDarkMode,
        getIsDarkMode,
    }

    return (
        <VisualsContext.Provider value={contextData}>
            { children }
        </VisualsContext.Provider>
    )
}
