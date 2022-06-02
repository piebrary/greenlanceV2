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

    const { getTranslation, addTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const data = []

    addTranslation('ButtonView.Card1Body', {
        en:'The button component lets you easily create buttons which can be customized via css.',
        nl:'Het knop component maakt het makkelijk om knoppen te maken welke via css kunnen worden gestyled.'
    })

    return (
        <Layout
            items={menuitems({ isAdmin, getTranslation })}
            title={getTranslation('BUTTON')}>
            <Card>
                {getTranslation('ButtonView.Card1Body')}
            </Card>
        </Layout>
    )
}
