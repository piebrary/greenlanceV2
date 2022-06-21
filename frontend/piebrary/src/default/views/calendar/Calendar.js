import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import { getEvent, getEvents, postEvent, putEvent, delEvent } from '../../services/EventService'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Calendar from '../../components/calendar/Calendar'

import { menuitems } from '../../assets/js/menu/items'
import { applyStyles } from '../../utils/applyStyles'

import styles from './Calendar.module.css'

export default function CalendarView(){

    const [events, setEvents] = useState([])

    const { applyTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    useEffect(() => {

        (async () => {

            const response = await getEvents()

            setEvents(response.data)

        })()

    }, [])

    return (
        <Layout
            items={menuitems({ isAdmin, applyTranslation })}
            title={applyTranslation('CALENDAR')}>
            <Calendar
                events={events}
                onCreateEvent={postEvent}
                onUpdateEvent={putEvent}
                onDeleteEvent={delEvent}
                />
        </Layout>
    )
}
