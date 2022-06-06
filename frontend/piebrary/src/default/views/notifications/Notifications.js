import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import Grid from '../../components/grid/Grid'

import { menuitems } from '../../assets/js/menu/items'
import { applyStyles } from '../../utils/applyStyles'
import { notificationManager } from '../../utils/notifications'

import styles from './Notifications.module.css'

export default function ButtonView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const notifications = notificationManager()

    createTranslation('NotificationView.Card1Body', {
        en:'The notification utility function lets you spawn notifications easily and they are fully customizeable.',
        nl:'De notificatie voorzienings functie maakt het makkelijk om notificaties te tonen. Ook zijn ze volledig naar eigen wens te stylen.'
    })

    createTranslation('NotificationView.SuccessCardTitle', {
        en:'A success notification',
        nl:'Een success notificatie'
    })

    createTranslation('NotificationView.InfoCardTitle', {
        en:'An info notification',
        nl:'Een info notificatie'
    })

    createTranslation('NotificationView.WarningCardTitle', {
        en:'A warning notification',
        nl:'Een waarschuwingsnotificatie'
    })

    createTranslation('NotificationView.DangerCardTitle', {
        en:'A danger notification',
        nl:'Een gevaar/error notificatie'
    })

    createTranslation('NotificationView.CreateNotificationButton', {
        en:'Create Notification',
        nl:'Maak notificatie'
    })

    return (
        <Layout
            items={menuitems({ isAdmin, applyTranslation })}
            title={applyTranslation('NOTIFICATIONS')}>
            <Card>
                {applyTranslation('NotificationView.Card1Body')}
            </Card>
            <Grid
                customStyles={applyStyles([styles], 'buttonsGrid')}
                >
                <Card
                    customStyles={applyStyles([styles], 'successCard')}
                    title={applyTranslation('NotificationView.SuccessCardTitle')}
                    onClick={() => {

                        notifications.create({
                            title: "A success notification",
                            type: 'success'
                        })

                    }}
                    >
                    {applyTranslation('NotificationView.CreateNotificationButton')}
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'infoCard')}
                    title={applyTranslation('NotificationView.InfoCardTitle')}
                    onClick={() => {

                        notifications.create({
                            title: "An info notification",
                            type: 'info'
                        })

                    }}
                    >
                    {applyTranslation('NotificationView.CreateNotificationButton')}
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'warningCard')}
                    title={applyTranslation('NotificationView.WarningCardTitle')}
                    onClick={() => {

                        notifications.create({
                            title: "A warning notification",
                            type: 'warning'
                        })

                    }}
                    >
                    {applyTranslation('NotificationView.CreateNotificationButton')}
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'dangerCard')}
                    title={applyTranslation('NotificationView.DangerCardTitle')}
                    onClick={() => {

                        notifications.create({
                            title: "A danger notification",
                            type: 'danger'
                        })

                    }}
                    >
                    {applyTranslation('NotificationView.CreateNotificationButton')}
                </Card>
            </Grid>
        </Layout>
    )
}
