import { createContext, useState, useEffect } from 'react'

import config from '../../config/config'

import { themes } from '../../default/assets/js/themes'

import { deepCopy } from '../../default/utils/deepCopy'

export const VisualsContext = createContext({})

export default function VisualsContextProvider({ children }){

    const [currentTheme, setCurrentTheme] = useState({
        name:'basic',
        values:deepCopy(themes['basic'])
    })

    useEffect(() => {

        if(config?.THEME && themes[config.THEME]){

            setTheme(config.THEME)

        }

    }, [])

    function setTheme(themeName){

        if(themes[themeName]){

            for(let cssVar in themes[themeName]){

                document.documentElement.style.setProperty(`--${cssVar}`, themes[themeName][cssVar])

            }

            setCurrentTheme({
                name:themeName,
                values:deepCopy(themes[themeName])
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
        <VisualsContext.Provider value={contextData}>
            { children }
        </VisualsContext.Provider>
    )
}
