import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Grid from '../../components/grid/Grid'

import { menuitems } from '../../assets/js/menu/items'
import { filterStyles } from '../../utils/filterStyles'

import styles from './Languages.module.css'

export default function LanguagesView(){

    const { getTranslation, addTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const data = []

    addTranslation('LanguagesView.Card1Title', {
        en:'Easily switch languages',
        nl:'Makkelijk wisselen tussen talen'
    })

    addTranslation('LanguagesView.Card1Body', {
        en:'The provided languages component makes it easy to switch between languages. All UI specific verbals are specified in language files and can be accessed through the LanguageContext.',
        nl:'De talen komponent maakt het makkelijk om te wisselen tussen talen. Alle tekst die gebruikt wordt ten behoeve van de User Interface is gespecificeerd in language files en kunnen via de LanguageContext gebruikt worden.'
    })

    addTranslation('LanguagesView.Card2Title', {
        en:'Add translations from View or Component to LanguageContext',
        nl:'Voeg vertalingen toe aan de LanguageContext vanuit Views of Components'
    })

    addTranslation('LanguagesView.Card2Body', {
        en:'The "addTranslation" function provided by the LanguageContext makes is easy to add translations from Views or Components and use everywhere throughtout the application.',
        nl:'De "addTranslation" functie die beschikbaar is via de LanguageContext maakt het makkelijk om vertalingen toe te voegen vanuit Views of Components en deze overal in de applicatie te gebruiken.'
    })

    return (
        <Layout
            items={menuitems({ isAdmin, getTranslation })}
            title={getTranslation('LANGUAGES')}>
            <Grid customStyles={filterStyles([styles], 'grid1')}>
                <Card
                    customStyles={filterStyles([styles], 'griditemOne')}
                    title={getTranslation('LanguagesView.Card1Title')}
                    >
                    {getTranslation('LanguagesView.Card1Body')}
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemTwo')}
                    title={getTranslation('LanguagesView.Card2Title')}
                    >
                    {getTranslation('LanguagesView.Card2Body')}
                </Card>
            </Grid>
        </Layout>
    )
}
