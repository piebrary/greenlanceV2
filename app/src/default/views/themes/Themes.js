import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'
import { VisualsContext } from '../../../default/contexts/VisualsContext'

import Layout from '../../../default/components/layouts/basic/Layout.js'
import Card from '../../../default/components/card/Card.js'
import Button from '../../../default/components/button/Button.js'
import Grid from '../../../default/components/grid/Grid.js'
import Controls from '../../../default/components/controls/Controls'

import Menu from '../../../default/components/menu/Menu'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Themes.module.css'

export default function FormView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole, settings } = useContext(UserContext)
    const { changeTheme, getAvailableThemes } = useContext(VisualsContext)

    createTranslation('ThemeView.Description', {
        'en':'Click on a card below to load that theme',
        'nl':'Klik op een kaart om het betreffende thema te laden'
    })

    return (
        <Layout
            className={styles.container}
            items={Menu({ userData, hasRole, applyTranslation })}
            title={applyTranslation('THEMES')}
            controls={<Controls />}
            >
            <Card
                customStyles={applyStyles([styles], 'descriptionCard')}
                >
                {applyTranslation('ThemeView.Description')}
            </Card>
            <Grid
                customStyles={applyStyles([styles], 'themeGrid')}
                >
                {
                    getAvailableThemes().map(name => {

                        return (
                            <Card
                                key={name}
                                customStyles={applyStyles([styles], 'themesCard')}
                                onClick={() => {
                                    changeTheme(name)
                                }}
                                >
                                {name}
                            </Card>
                        )
                    })
                }
            </Grid>
        </Layout>
    )
}
