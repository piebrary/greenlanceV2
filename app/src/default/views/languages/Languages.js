import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Grid from '../../../default/components/grid/Grid'
import Controls from '../../../default/components/controls/Controls'

import { menuitems } from '../../../default/assets/js/menu/items'
import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Languages.module.css'

export default function LanguagesView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    const data = []

    createTranslation('LanguagesView.Card1Title', {
        en:'Easily switch languages',
        nl:'Makkelijk wisselen tussen talen'
    })

    createTranslation('LanguagesView.Card1Body', {
        en:'The provided languages component makes it easy to switch between languages. All UI specific verbals are specified in language files and can be accessed through the LanguageContext.',
        nl:'De talen komponent maakt het makkelijk om te wisselen tussen talen. Alle tekst die gebruikt wordt ten behoeve van de User Interface is gespecificeerd in language files en kunnen via de LanguageContext gebruikt worden.'
    })

    createTranslation('LanguagesView.Card2Title', {
        en:'Add translations from View or Component to LanguageContext',
        nl:'Voeg vertalingen toe aan de LanguageContext vanuit Views of Components'
    })

    createTranslation('LanguagesView.Card2Body', {
        en:'The "createTranslation" function provided by the LanguageContext makes is easy to add translations from Views or Components and use everywhere throughtout the application.',
        nl:'De "createTranslation" functie die beschikbaar is via de LanguageContext maakt het makkelijk om vertalingen toe te voegen vanuit Views of Components en deze overal in de applicatie te gebruiken.'
    })

    return (
        <Layout
            items={menuitems({ userData, hasRole, applyTranslation })}
            title={applyTranslation('LANGUAGES')}
            controls={<Controls />}
            >
            <Grid customStyles={applyStyles([styles], 'grid1')}>
                <Card
                    customStyles={applyStyles([styles], 'griditemOne')}
                    title={applyTranslation('LanguagesView.Card1Title')}
                    >
                    {applyTranslation('LanguagesView.Card1Body')}
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemTwo')}
                    title={applyTranslation('LanguagesView.Card2Title')}
                    >
                    {applyTranslation('LanguagesView.Card2Body')}
                </Card>
            </Grid>
        </Layout>
    )
}
