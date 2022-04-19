import { createContext, useState, useEffect } from 'react'

import config from '../config/config'

import { useWindowDimension } from '../utils/useWindowDimension'

export const ThemeContext = createContext({})

export default function ThemeContextProvider({ children }){

    const [theme, setTheme] = useState(require('../themes/' + config.THEME))
    const [viewmode, setViewmode] = useState(window.innerWidth > theme.settings.viewmodeBreakpoint ? 'desktop' : 'mobile')

    const [width, height] = useWindowDimension()

    useEffect(() => {

        setViewmode(width > theme.settings.viewmodeBreakpoint ? 'desktop' : 'mobile')

    }, [width])

    function switchTheme(newTheme){

        setTheme(require('../themes/' + newTheme))

    }

    const contextData = {
        theme,
        switchTheme,
        viewmode
    }

    return (
        <ThemeContext.Provider value={contextData}>
            { children }
        </ThemeContext.Provider>
    )
}
