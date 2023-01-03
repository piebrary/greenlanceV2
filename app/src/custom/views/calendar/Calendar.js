import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { getShifts } from '../../../custom/services/ShiftService'

import Layout from '../../../default/components/layouts/basic/Layout'
import Calendar from '../../../default/components/calendar/Calendar'
import Controls from '../../../default/components/controls/Controls'
import Menu from '../../../custom/components/menu/Menu'

import { applyStyles } from '../../../default/utils/applyStyles'
import { notificationManager } from '../../../default/utils/notifications'

import styles from './Calendar.module.css'

export default function CalendarView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    const notifications = notificationManager()

    const [events, setEvents] = useState([])

    useEffect(() => {

        ;(async () => {

            try {

                // const result = await Promise.all([getEvents(), getShifts()])
                //
                // setEvents([...result[0].data, ...result[1].data])

                const response = await getShifts()

                setEvents(response.data)

            } catch (error) {

                notifications.create({
                    title: "Could not fetch events and shifts",
                    type: "danger",
                })

            }

        })()

    }, [])

    return (
        <Layout
            items={Menu()}
            title={applyTranslation('CALENDAR')}
            controls={<Controls />}
            >
            <Calendar
                events={events}
                />
        </Layout>
    )
}
