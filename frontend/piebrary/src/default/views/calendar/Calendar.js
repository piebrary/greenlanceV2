import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Calendar from '../../components/calendar/Calendar'

import { menuitems } from '../../assets/js/menu/items'
import { filterStyles } from '../../utils/filterStyles'

import styles from './Calendar.module.css'

export default function CalendarView(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const data = []

    return (
        <Layout
            items={menuitems({ isAdmin, translate })}
            title={translate('CALENDAR')}>
            <Calendar
                events={data}
                />
        </Layout>
    )
}
