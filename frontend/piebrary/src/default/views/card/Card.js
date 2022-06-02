import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'

import { menuitems } from '../../assets/js/menu/items'
import { filterStyles } from '../../utils/filterStyles'

import styles from './Card.module.css'

export default function CardView(){

    const { getTranslation, addTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const data = []

    addTranslation('CardView.Card1Title', {
        en:'Card with description',
        nl:'Kaart met omschrijving'
    })

    addTranslation('CardView.Card1Description', {
        en:'This is the (optional) description.',
        nl:'Dit is de optionele omschrijving.'
    })

    addTranslation('CardView.Card1Body', {
        en:'The card component provides an easy way to display text or other elements and components. The card can have an optional description and is optionally clickable.',
        nl:'De kaart component biedt een eenvoudige manier om tekst of andere elementen en componenten weer te geven.'
    })

    addTranslation('CardView.Card2Title', {
        en:'Clickable card',
        nl:'Klikbare kaart'
    })

    addTranslation('CardView.Card2Body', {
        en:'This card is clickable.',
        nl:'Deze kaart kan geklikt worden.'
    })

    addTranslation('CardView.CardClickAlert', {
        en:'You have clicked the clickable card!',
        nl:'Je hebt op de klikbare kaart geklikt!'
    })

    return (
        <Layout
            items={menuitems({ isAdmin, getTranslation })}
            title={getTranslation('CARD')}>
            <Card
                title={getTranslation('CardView.Card1Title')}
                description={getTranslation('CardView.Card1Description')}
                >
                {getTranslation('CardView.Card1Body')}
            </Card>
            <Card
                title={getTranslation('CardView.Card2Title')}
                onClick={() => alert(getTranslation('CardView.CardClickAlert'))}
                >
                {getTranslation('CardView.Card2Body')}
            </Card>
        </Layout>
    )
}
