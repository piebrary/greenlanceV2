import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'

import { menuitems } from '../../assets/js/menu/items'
import { filterStyles } from '../../utils/filterStyles'

import styles from './Card.module.css'

export default function CardView(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const data = []

    return (
        <Layout
            items={menuitems({ isAdmin, translate })}
            title={translate('CARD')}>
            <Card
                title={'Card with description'}
                description={'This is the (optional) description'}
                >
                The card component provides an easy way to display text or other elements and components. The card can have an optional description and is optionally clickable.
            </Card>
            <Card
                title={'Clickable card'}
                onClick={() => alert('You have clicked the clickable card!')}
                >
                This card is clickable
            </Card>
        </Layout>
    )
}
