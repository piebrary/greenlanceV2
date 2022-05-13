import { useState, useEffect, useContext } from 'react'

import moment from 'moment'

import { LanguageContext } from '../../contexts/LanguageContext'

import ButtonGroup from '../buttonGroup/ButtonGroup'
import Button from '../button/Button'

import { AiFillPlusCircle } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'

import { filterStyles } from '../../utils/filterStyles'

import styles from './Calendar.module.css'

export default function Calendar({ events, newEventJSX, editEventJSX, viewEventJSX, onSaveEvent, onDeleteEvent }){

    const { translate } = useContext(LanguageContext)

    const [viewRange, setViewRange] = useState('month')
    const [viewMode, setViewMode] = useState('calendar')
    const [previousViewMode, setPreviousViewMode] = useState('calendar')
    const [calendar, setCalendar] = useState([])
    const [currentViewTime, setCurrentViewTime] = useState(Date.now())
    const [detailsJSX, setDetailsJSX] = useState([])
    const [currentActiveEvent, setCurrentActiveEvent] = useState({})

    function goPrevious(){

        let newViewTime

        if(viewRange === 'day') newViewTime = moment(currentViewTime).subtract(1, 'd')
        if(viewRange === 'week') newViewTime = moment(currentViewTime).subtract(7, 'd')
        if(viewRange === 'month') newViewTime = moment(currentViewTime).subtract(1, 'M')

        setCurrentViewTime(newViewTime)

    }

    function goNow(){

        setCurrentViewTime(Date.now())

    }

    function goNext(){

        let newViewTime

        if(viewRange === 'day') newViewTime = moment(currentViewTime).add(1, 'd')
        if(viewRange === 'week') newViewTime = moment(currentViewTime).add(7, 'd')
        if(viewRange === 'month') newViewTime = moment(currentViewTime).add(1, 'M')

        setCurrentViewTime(newViewTime)

    }

    function adjustViewRange(mode){

        setViewRange(mode)

    }

    function adjustViewMode(mode){

        setPreviousViewMode(previous => { return previous })

        setViewMode(mode)

    }

    function saveEvent(){

        // here the parent function will be called

        onSaveEvent(currentActiveEvent)

    }

    function deleteEvent(){

        onDeleteEvent(currentActiveEvent)

    }

    function resetEvent(event){

        openDetailsView(event, viewMode, currentActiveEvent)

    }

    function openDetailsView(event, action, data){

        event.stopPropagation()

        if(action === 'newEvent'){

            setViewMode('newEvent')
            setDetailsJSX(newEventJSX())

        }

        if(action === 'editEvent'){

            setViewMode('editEvent')
            setDetailsJSX(editEventJSX(data))
            setCurrentActiveEvent(data)

        }

        if(action === 'viewEvent'){

            setViewMode('viewEvent')
            setDetailsJSX(viewEventJSX(data))
            setCurrentActiveEvent(data)

        }

    }

    useEffect(() => {

        const range = []

        if(viewRange === 'day'){

            const date = moment(currentViewTime)
            const dateFormatted = date.format('DD-MM-YYYY')
            const dayOfMonth = moment(date).date()
            const monthNumber = moment(date).month()
            const month = moment(date).month(monthNumber).format('MMMM')
            const startOfDay = parseFloat(moment(date).startOf('day').format('x'))
            const endOfDay = parseFloat(moment(date).endOf('day').format('x'))

            range.push({
                dayOfMonth,
                month,
                date,
                dateFormatted,
                startOfDay,
                endOfDay
            })

        }

        if(viewRange === 'week'){

            const dayOfWeek = moment(currentViewTime).day()
            const msPerDay = 1000 * 60 * 60 * 24

            for(let i = 0; i < 7; i++){

                const date = moment(currentViewTime + ((1 - dayOfWeek + i) * msPerDay))
                const dateFormatted = date.format('DD-MM-YYYY')
                const dayOfMonth = moment(date).date()
                const monthNumber = moment(date).month()
                const month = moment(date).month(monthNumber).format('MMMM')
                const startOfDay = parseFloat(moment(date).startOf('day').format('x'))
                const endOfDay = parseFloat(moment(date).endOf('day').format('x'))

                range.push({
                    dayOfMonth,
                    month,
                    date,
                    dateFormatted,
                    startOfDay,
                    endOfDay
                })

            }

        }

        if(viewRange === 'month'){

            const daysInMonth = moment(currentViewTime).daysInMonth()
            const firstMonthDayInWeekdayNumber = moment(currentViewTime).startOf('month').weekday()
            const lastMonthDayInWeekdayNumber = moment(currentViewTime).endOf('month').weekday()
            const dayNumberOfMonth = moment(currentViewTime).date()
            const msPerDay = 1000 * 60 * 60 * 24
            const remainingDaysOfLastMonth = firstMonthDayInWeekdayNumber === 0 ? -7 : 0 - firstMonthDayInWeekdayNumber
            const remainingDaysOfNextMonth = lastMonthDayInWeekdayNumber === 0 ? 0 : 7 - lastMonthDayInWeekdayNumber

            for(let i = remainingDaysOfLastMonth; i < daysInMonth + remainingDaysOfNextMonth; i++){

                const date = moment(currentViewTime + ((1 - dayNumberOfMonth + i) * msPerDay))
                const dateFormatted = date.format('DD-MM-YYYY')
                const dayOfMonth = moment(date).date()
                const monthNumber = moment(date).month()
                const month = moment(date).month(monthNumber).format('MMMM')
                const startOfDay = parseFloat(moment(date).startOf('day').format('x'))
                const endOfDay = parseFloat(moment(date).endOf('day').format('x'))
                const isMainMonth = monthNumber === moment(currentViewTime).month() ? true : false

                range.push({
                    dayOfMonth,
                    month,
                    isMainMonth,
                    date,
                    dateFormatted,
                    startOfDay,
                    endOfDay
                })

            }

        }

        const rows = []

        for(let i = 0; i < Math.max(Math.floor(range.length / 7), 1); i++){

            const row = []

            range.map((d, j) => {

                if(range.length === 1 || range.length === 7 || range.length > 7 && j > i * 7 && j <= (i + 1) * 7){

                    row.push(
                        <td
                            key={d.dateFormatted}
                            className={`${viewRange === 'month' && !d.isMainMonth ? styles.lowTransparency : ''}`}
                            onClick={evt => {

                                if(viewRange === 'month' && d.isMainMonth || viewRange !== 'month'){

                                    openDetailsView(evt, 'newEvent')

                                }

                            }}
                        >
                            {
                                viewRange === 'week'
                                || viewRange === 'month'
                                ? (
                                    <div
                                        className={`${styles.date} ${d.dateFormatted === moment().format('DD-MM-YYYY') ? styles.currentDay : ''}`}
                                    >
                                        {
                                            d.isMainMonth || viewRange === 'week'
                                            ? (
                                                <AiFillPlusCircle
                                                    className={`${viewRange === 'day' ? styles.createEventButton : styles.invisibleCreateEventButton}`}
                                                    size={19}
                                                />
                                            )
                                            : null
                                        }
                                        {
                                            (
                                                viewRange === 'week' && j === 0
                                            ) || (
                                                viewRange === 'month' && j === 1
                                            ) || (
                                                range.length > 1 && range[j - 1].month !== d.month
                                            )
                                            ? (
                                                <div className={styles.month}>
                                                    {d.month}
                                                </div>
                                            )
                                            : null
                                        }
                                        <div className={styles.dayOfMonth}>
                                            {d.dayOfMonth}
                                        </div>
                                    </div>
                                )
                                : null
                            }
                            {
                                events.map(event => {

                                    if(
                                        (
                                            event.time.start > d.startOfDay && event.time.start < d.endOfDay
                                        ) || (
                                            event.time.start < d.endOfDay && event.time.end > d.startOfDay
                                        ) || (
                                            event.dueDate > d.startOfDay && event.dueDate < d.endOfDay
                                        )
                                    ){

                                        return (
                                            <div
                                                key={event._id}
                                                className={styles.eventContainer}
                                                onClick={evt => {

                                                    if(viewRange === 'month' && d.isMainMonth || viewRange !== 'month'){

                                                        openDetailsView(evt, 'viewEvent', event)

                                                    }

                                                }}
                                            >
                                                {event.name}
                                            </div>
                                        )

                                    }

                                })
                            }
                            {
                                viewRange === 'day'
                                ? (
                                    <div className={styles.headerButtonGroup} style={{ margin: '10px auto 10px auto' }}>
                                        <button className={styles.headerButton} onClick={evt => openDetailsView(evt, 'newEvent')} style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems:'center', padding: '10px 25px 10px 10px' }}>
                                            <AiFillPlusCircle size={25} style={{ margin: '15px' }}/>
                                            Create new event
                                        </button>
                                    </div>
                                )
                                : null
                            }
                        </td>
                    )

                }

            })

            rows.push(
                <tr key={i}>
                    {row}
                </tr>
            )

        }

        setCalendar(rows)

    }, [viewRange, currentViewTime, events])

    return (
        <>
        {
            <div className={styles.container}>
                <div className={styles.header}>
                    <ButtonGroup
                        customStyles={filterStyles([styles], 'controlGroup')}
                        >
                        {
                            viewMode === 'calendar' && (
                                <Button
                                    label={translate('PREVIOUS')}
                                    onClick={() => goPrevious()}
                                    customStyles={filterStyles([styles], 'controlBtn')}
                                    />
                            )
                        }
                        {
                            viewMode === 'calendar' && (
                                <Button
                                    label={translate(
                                        (viewRange === 'day' && 'TODAY')
                                        || (viewRange === 'week' && 'THIS_WEEK')
                                        || (viewRange === 'month' && 'THIS_MONTH')
                                    )}
                                    onClick={() => goNow()}
                                    customStyles={filterStyles([styles], 'controlBtn')}
                                    />
                            )
                        }
                        {
                            viewMode === 'list' && (
                                <Button
                                    label={translate('TODAY')}
                                    onClick={() => goNow()}
                                    customStyles={filterStyles([styles], 'controlBtn')}
                                    />
                            )
                        }
                        {
                            viewMode === 'calendar' && (
                                <Button
                                    label={translate('NEXT')}
                                    onClick={() => goNext()}
                                    customStyles={filterStyles([styles], 'controlBtn')}
                                    />
                            )
                        }
                        {
                            (viewMode === 'newEvent' || viewMode === 'editEvent') && (
                                <ButtonGroup
                                    customStyles={filterStyles([styles], 'controlGroup')}
                                    >
                                    <Button
                                        label={translate('SAVE')}
                                        onClick={event => saveEvent(event)}
                                        customStyles={filterStyles([styles], 'controlBtn')}
                                        />
                                    <Button
                                        label={translate('RESET')}
                                        onClick={event => resetEvent(event)}
                                        customStyles={filterStyles([styles], 'controlBtn')}
                                        />
                                    {
                                        viewMode === 'editEvent' && (
                                            <Button
                                                label={translate('DELETE')}
                                                onClick={event => deleteEvent(event)}
                                                customStyles={filterStyles([styles], 'controlBtn')}
                                                />
                                        )
                                    }
                                </ButtonGroup>
                            )
                        }
                        {
                            viewMode === 'viewEvent' && (
                                <ButtonGroup
                                    customStyles={filterStyles([styles], 'controlGroup')}
                                    >
                                    <Button
                                        label={translate('EDIT')}
                                        onClick={event => openDetailsView(event, 'editEvent', currentActiveEvent)}
                                        customStyles={filterStyles([styles], 'controlBtn')}
                                        />
                                    <Button
                                        label={translate('DELETE')}
                                        onClick={event => deleteEvent(event)}
                                        customStyles={filterStyles([styles], 'controlBtn')}
                                        />
                                </ButtonGroup>
                            )
                        }
                    </ButtonGroup>
                    {
                        viewMode === 'calendar' && (
                            <ButtonGroup
                                customStyles={filterStyles([styles], 'controlGroup')}
                                >
                                <Button
                                    label={translate('DAY')}
                                    customStyles={filterStyles([styles], viewRange === 'day' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewRange('day')}
                                    />
                                <Button
                                    label={translate('WEEK')}
                                    customStyles={filterStyles([styles], viewRange === 'week' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewRange('week')}
                                    />
                                <Button
                                    label={translate('MONTH')}
                                    customStyles={filterStyles([styles], viewRange === 'month' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewRange('month')}
                                    />
                            </ButtonGroup>
                        )
                    }
                    {
                        viewMode === 'newEvent' && (
                            <div>
                                Create new event
                            </div>
                        )
                    }
                    {
                        viewMode === 'editEvent' && (
                            <div>
                                Update {currentActiveEvent.title}
                            </div>
                        )
                    }
                    {
                        viewMode === 'viewEvent' && (
                            <div>
                                {currentActiveEvent.title}
                            </div>
                        )
                    }
                    {
                        (viewMode === 'calendar' || viewMode === 'list') && (
                            <ButtonGroup
                                customStyles={filterStyles([styles], 'controlGroup')}
                                >
                                <Button
                                    label={translate('CALENDAR')}
                                    customStyles={filterStyles([styles], viewMode === 'calendar' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewMode('calendar')}
                                    />
                                <Button
                                    label={translate('LIST')}
                                    customStyles={filterStyles([styles], viewMode === 'list' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewMode('list')}
                                    />
                            </ButtonGroup>
                        )
                    }
                    {
                        (viewMode === 'newEvent' || viewMode === 'editEvent' || viewMode === 'viewEvent') && (
                            <ButtonGroup
                                customStyles={filterStyles([styles], 'controlGroup')}
                                >
                                <Button
                                    label={translate('CLOSE')}
                                    onClick={event => adjustViewMode(previousViewMode)}
                                    customStyles={filterStyles([styles], 'controlBtn')}
                                    />
                            </ButtonGroup>
                        )
                    }
                </div>
                <div className={styles.content}>
                    {
                        viewMode === 'calendar' && (
                            <div className={styles.calendarContainer}>
                                {
                                    viewRange === 'day' && (
                                        <div className={styles.calendar}>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>{moment(currentViewTime).format('DD MMMM YYYY')}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {calendar}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                }
                                {
                                    (viewRange === 'week' || viewRange === 'month') && (
                                        <div className={styles.calendar}>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Monday</th>
                                                        <th>Tuesday</th>
                                                        <th>Wednesday</th>
                                                        <th>Thursday</th>
                                                        <th>Friday</th>
                                                        <th>Saturday</th>
                                                        <th>Sunday</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {calendar}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        viewMode === 'list' && (
                            <div className={styles.listContainer}>
                                {
                                    events.map(event => {

                                        return (
                                            <div className={styles.listItem} key={event._id}>
                                                <div className={styles.listItemTitle}>
                                                    {event.title}
                                                </div>
                                                <div className={styles.listItemContent}>
                                                    Start: {moment(event.start).format()} <br />
                                                    Until: {moment(event.end).format()} <br />
                                                    Description: {event.description} <br />
                                                </div>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        )
                    }
                    {
                        (viewMode === 'newEvent' || viewMode === 'editEvent' || viewMode === 'viewEvent') && (
                            <div className={styles.detailsContainer}>
                                {detailsJSX}
                            </div>
                        )
                    }
                </div>
            </div>
        }
        </>
    )

}
