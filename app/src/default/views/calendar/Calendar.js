import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { getEvent, getEvents, postEvent, putEvent, delEvent } from '../../../default/services/EventService'

import Layout from '../../../default/components/layouts/basic/Layout'
import Calendar from '../../../default/components/calendar/Calendar'
import Controls from '../../../default/components/controls/Controls'

import Menu from '../../../default/components/menu/Menu'
import { applyStyles } from '../../../default/utils/applyStyles'
import { notificationManager } from '../../../default/utils/notifications'

import styles from './Calendar.module.css'

export default function CalendarView(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    const notifications = notificationManager()

    const [events, setEvents] = useState([])

    useEffect(() => {

        ;(async () => {

            try {

                const response = await getEvents()

                setEvents(response.data)

            } catch {

                notifications.create({
                    title: "Could not fetch settings",
                    type: "danger",
                })

            }

        })()

    }, [])

    return (
        <Layout
            items={Menu({ userData, hasRole, applyTranslation })}
            title={applyTranslation('CALENDAR')}
            controls={<Controls />}
            >
            <Calendar
                events={events}
                onCreateEvent={postEvent}
                onUpdateEvent={putEvent}
                onDeleteEvent={delEvent}
                />
        </Layout>
    )
}
