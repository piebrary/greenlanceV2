import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Button from '../../../default/components/button/Button'
import Grid from '../../../default/components/grid/Grid'
import Controls from '../../../default/components/controls/Controls'

import Menu from '../../../default/components/menu/Menu'
import { applyStyles } from '../../../default/utils/applyStyles'
import { notificationManager } from '../../../default/utils/notifications'

import styles from './Notifications.module.css'

export default function ButtonView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

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
            items={Menu({ userData, hasRole, applyTranslation })}
            title={applyTranslation('NOTIFICATIONS')}
            controls={<Controls />}
            >
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
