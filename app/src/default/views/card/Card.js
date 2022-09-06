import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Layout from '../../components/layouts/basic/Layout'
import Card from '../../components/card/Card'

import { menuitems } from '../../assets/js/menu/items'
import { applyStyles } from '../../utils/applyStyles'

import styles from './Card.module.css'

export default function CardView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, isAdmin } = useContext(UserContext)

    const data = []

    createTranslation('CardView.Card1Title', {
        en:'Card with description',
        nl:'Kaart met omschrijving'
    })

    createTranslation('CardView.Card1Description', {
        en:'This is the (optional) description.',
        nl:'Dit is de optionele omschrijving.'
    })

    createTranslation('CardView.Card1Body', {
        en:'The card component provides an easy way to display text or other elements and components. The card can have an optional description and is optionally clickable.',
        nl:'De kaart component biedt een eenvoudige manier om tekst of andere elementen en componenten weer te geven.'
    })

    createTranslation('CardView.Card2Title', {
        en:'Clickable card',
        nl:'Klikbare kaart'
    })

    createTranslation('CardView.Card2Body', {
        en:'This card is clickable.',
        nl:'Deze kaart kan geklikt worden.'
    })

    createTranslation('CardView.CardClickAlert', {
        en:'You have clicked the clickable card!',
        nl:'Je hebt op de klikbare kaart geklikt!'
    })

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('CARD')}>
            <Card
                title={applyTranslation('CardView.Card1Title')}
                description={applyTranslation('CardView.Card1Description')}
                >
                {applyTranslation('CardView.Card1Body')}
            </Card>
            <Card
                title={applyTranslation('CardView.Card2Title')}
                onClick={() => alert(applyTranslation('CardView.CardClickAlert'))}
                >
                {applyTranslation('CardView.Card2Body')}
            </Card>
        </Layout>
    )
}
