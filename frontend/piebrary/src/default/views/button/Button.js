import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'

import { menuitems } from '../../assets/js/menu/items'
import { filterStyles } from '../../utils/filterStyles'

import styles from './Button.module.css'

export default function ButtonView(){

    const { translate, addTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const data = []

    addTranslation('ButtonView.Card1Title', {
        en:'Card Title',
        nl:'Kaart Titel'
    })

    addTranslation('ButtonView.Card1Description', {
        en:'Card description',
        nl:'Kaart omschrijving'
    })

    addTranslation('ButtonView.Card1Body', {
        en:'The card component provides an easy way to display text or other elements and components. The card can have an optional description and is optionally clickable.',
        nl:'De kaart component biedt een eenvoudige manier om tekst of andere elementen en componenten weer te geven.'
    })

    return (
        <Layout
            items={menuitems({ isAdmin, translate })}
            title={translate('CARD')}>
            <Card
                title={translate('ButtonView.Card1Title')}
                description={translate('ButtonView.Card1Description')}
                >
                {translate('ButtonView.Card1Body')}
            </Card>
        </Layout>
    )
}
