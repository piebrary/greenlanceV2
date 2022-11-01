import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { getEvent, getEvents, postEvent, putEvent, delEvent } from '../../../default/services/EventService'

import Layout from '../../../default/components/layouts/basic/Layout'
import Calendar from '../../../default/components/calendar/Calendar'
import Controls from '../../../default/components/controls/Controls'

import { menuitems } from '../../../custom/assets/js/menu/items'
import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Calendar.module.css'

export default function CalendarView(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, isAdmin } = useContext(UserContext)

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('CALENDAR')}
            controls={<Controls />}
            >
            <Calendar
                getEvents={getEvents}
                onCreateEvent={postEvent}
                onUpdateEvent={putEvent}
                onDeleteEvent={delEvent}
                />
        </Layout>
    )
}
