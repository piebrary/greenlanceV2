import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import Grid from '../../components/grid/Grid'

import { menuitems } from '../../assets/js/menu/items'
import { filterStyles } from '../../utils/filterStyles'
import { notificationManager } from '../../utils/notifications'

import styles from './Notifications.module.css'

export default function ButtonView(){

    const { getTranslation, addTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const notifications = notificationManager()

    addTranslation('NotificationView.Card1Body', {
        en:'The notification utility function lets you spawn notifications easily and they are fully customizeable.',
        nl:'De notificatie voorzienings functie maakt het makkelijk om notificaties te tonen. Ook zijn ze volledig naar eigen wens te stylen.'
    })

    addTranslation('NotificationView.SuccessCardTitle', {
        en:'A success notification',
        nl:'Een success notificatie'
    })

    addTranslation('NotificationView.InfoCardTitle', {
        en:'An info notification',
        nl:'Een info notificatie'
    })

    addTranslation('NotificationView.WarningCardTitle', {
        en:'A warning notification',
        nl:'Een waarschuwingsnotificatie'
    })

    addTranslation('NotificationView.DangerCardTitle', {
        en:'A danger notification',
        nl:'Een gevaar/error notificatie'
    })

    addTranslation('NotificationView.CreateNotificationButton', {
        en:'Create Notification',
        nl:'Maak notificatie'
    })

    return (
        <Layout
            items={menuitems({ isAdmin, getTranslation })}
            title={getTranslation('NOTIFICATIONS')}>
            <Card>
                {getTranslation('NotificationView.Card1Body')}
            </Card>
            <Grid
                customStyles={filterStyles([styles], 'buttonsGrid')}
                >
                <Card
                    customStyles={filterStyles([styles], 'successCard')}
                    title={getTranslation('NotificationView.SuccessCardTitle')}
                    onClick={() => {

                        notifications.create({
                            title: "A success notification",
                            type: 'success'
                        })

                    }}
                    >
                    {getTranslation('NotificationView.CreateNotificationButton')}
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'infoCard')}
                    title={getTranslation('NotificationView.InfoCardTitle')}
                    onClick={() => {

                        notifications.create({
                            title: "An info notification",
                            type: 'info'
                        })

                    }}
                    >
                    {getTranslation('NotificationView.CreateNotificationButton')}
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'warningCard')}
                    title={getTranslation('NotificationView.WarningCardTitle')}
                    onClick={() => {

                        notifications.create({
                            title: "A warning notification",
                            type: 'warning'
                        })

                    }}
                    >
                    {getTranslation('NotificationView.CreateNotificationButton')}
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'dangerCard')}
                    title={getTranslation('NotificationView.DangerCardTitle')}
                    onClick={() => {

                        notifications.create({
                            title: "A danger notification",
                            type: 'danger'
                        })

                    }}
                    >
                    {getTranslation('NotificationView.CreateNotificationButton')}
                </Card>
            </Grid>
        </Layout>
    )
}
