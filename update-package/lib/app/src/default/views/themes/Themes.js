import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'
import { VisualsContext } from '../../../default/contexts/VisualsContext'

import Layout from '../../../default/components/layouts/basic/Layout.js'
import Card from '../../../default/components/card/Card.js'
import Button from '../../../default/components/button/Button.js'
import Grid from '../../../default/components/grid/Grid.js'

import { menuitems } from '../../../default/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Themes.module.css'

export default function FormView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, isAdmin, settings } = useContext(UserContext)
    const { setTheme, getAvailableThemes } = useContext(VisualsContext)

    createTranslation('ThemeView.Description', {
        'en':'Click on a card below to load that theme',
        'nl':'Klik op een kaart om het betreffende thema te laden'
    })

    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('THEMES')}>
            <Card
                customStyles={applyStyles([styles], 'descriptionCard')}
                >
                {applyTranslation('ThemeView.Description')}
            </Card>
            <Grid
                customStyles={applyStyles([styles], 'themeGrid')}
                >
                {
                    getAvailableThemes().map(theme => {

                        return (
                            <Card
                                key={theme.name}
                                customStyles={applyStyles([styles], 'themesCard')}
                                onClick={() => {
                                    setTheme(theme.name)
                                }}
                                >
                                {theme.name}
                            </Card>
                        )
                    })
                }
            </Grid>
        </Layout>
    )
}
