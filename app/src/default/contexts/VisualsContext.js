import { createContext, useState, useEffect } from 'react'

import config from '../../config/config'

import { themes } from '../../default/assets/js/themes'

import { deepCopy } from '../../default/utils/deepCopy'

export const VisualsContext = createContext({})

export default function VisualsContextProvider({ children }){

    const [currentTheme, setCurrentTheme] = useState(config.THEME || 'default')
    const [darkmode, setDarkmode] = useState(false)

    let themes

    try {

        themes = require('../../custom/assets/js/themes').themes

    } catch (error) {

        themes = require('../../default/assets/js/themes').themes

    }

    function changeTheme(name){

        if(themes[name]){

            setCurrentTheme(name)

        }

    }

    function toggleDarkmode(){

        setDarkmode(!darkmode)

    }

    useEffect(() => {

        if(!themes[currentTheme]){

            setCurrentTheme('default')

        }

        const themeProperties = themes[currentTheme]({ darkmode })

        for(let property in themeProperties){

            document.documentElement.style.setProperty(`--${property}`, themeProperties[property])

        }

    }, [currentTheme, darkmode])

    function getAvailableThemes(){

        return deepCopy(themes)

    }

    function getCurrentTheme(){

        return deepCopy(themes[currentTheme]({ darkmode }))

    }

    const contextData = {
        changeTheme,
        toggleDarkmode,
        getAvailableThemes,
        getCurrentTheme
    }

    return (
        <VisualsContext.Provider value={contextData}>
            { children }
        </VisualsContext.Provider>
    )
}
