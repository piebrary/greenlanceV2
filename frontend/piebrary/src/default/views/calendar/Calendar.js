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

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, isAdmin } = useContext(UserContext)

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('CALENDAR')}>
            <Calendar
                getEvents={getEvents}
                onCreateEvent={postEvent}
                onUpdateEvent={putEvent}
                onDeleteEvent={delEvent}
                />
        </Layout>
    )
}
