import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Button from '../../../default/components/button/Button'

import { menuitems } from '../../../default/assets/js/menu/items'
import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Button.module.css'

export default function ButtonView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, isAdmin } = useContext(UserContext)

    createTranslation('ButtonView.Card1Body', {
        en:'The button component lets you easily create buttons which can be customized via css.',
        nl:'Het knop component maakt het makkelijk om knoppen te maken welke via css kunnen worden gestyled.'
    })

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('BUTTON')}>
            <Card>
                {applyTranslation('ButtonView.Card1Body')}
            </Card>
        </Layout>
    )
}
