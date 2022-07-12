import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'
import { VisualsContext } from '../../contexts/VisualsContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout.js'
import Card from '../../components/card/Card.js'
import Button from '../../components/button/Button.js'
import Grid from '../../components/grid/Grid.js'

import { menuitems } from '../../assets/js/menu/items'

import { applyStyles } from '../../utils/applyStyles'

import styles from './Themes.module.css'

export default function FormView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { isAdmin, settings } = useContext(UserContext)
    const { setTheme, getAvailableThemes } = useContext(VisualsContext)

    createTranslation('ThemeView.Description', {
        'en':'Click on a card below to load that theme',
        'nl':'Klik op een kaart om het betreffende thema te laden'
    })

    return (
        <Layout
            className={styles.container}
            items={menuitems({ isAdmin, applyTranslation })}
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
