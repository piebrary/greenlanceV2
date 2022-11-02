import { createContext, useEffect, useState } from 'react'

export const ConfigContext = createContext({})

export default function ConfigContextProvider({ children }){

    const [config, setConfig] = useState(() => {

        try {

            const defaultConfig = require('../../default/config')
            const customConfig = require('../../custom/config')

            const newConfig = Object.assign(defaultConfig, customConfig)

            return newConfig

        } catch {

            return require('../../default/config')

        }

    })

    return (
        <ConfigContext.Provider value={{ ...config }}>
            { children }
        </ConfigContext.Provider>
    )
}
