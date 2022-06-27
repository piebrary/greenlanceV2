import { useState, useEffect, useContext } from 'react'

import moment from 'moment'
import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../../default/contexts/LanguageContext'

import ButtonGroup from '../buttonGroup/ButtonGroup'
import Button from '../button/Button'
import Input from '../../components/formElements/input/Input.js'
import LocationInput from '../../components/locationInput/LocationInput.js'
import Form from '../../components/form/Form'
import Checkbox from '../../components/formElements/checkbox/Checkbox'
import Select from '../../components/formElements/select/Select'
import Card from '../../components/card/Card'
import Textarea from '../../components/formElements/textarea/Textarea'

import { AiFillPlusCircle } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'

import { createStyle } from '../../utils/createStyle'
import { applyStyles } from '../../utils/applyStyles'
import { containsNumber } from '../../utils/containsNumber'

import styles from './Calendar.module.css'

export default function Calendar(attributes){

    const {
        customStyles,
        getEvents,
        onCreateEvent,
        onUpdateEvent,
        onDeleteEvent
    } = attributes

    const { applyTranslation, createTranslation } = useContext(LanguageContext)

    const { register, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm()

    const [events, setEvents] = useState([])
    const [viewRange, setViewRange] = useState('month')
    const [viewMode, setViewMode] = useState('calendar')
    const [previousViewMode, setPreviousViewMode] = useState('calendar')
    const [calendar, setCalendar] = useState([])
    const [selectedViewTime, setSelectedViewTime] = useState(Date.now())
    const [selectedEvent, setSelectedEvent] = useState({})

    useEffect(() => {

        (async () => {

            const response = await getEvents()

            setEvents(response.data)

        })()

    }, [])

    createTranslation('CalendarComponent.TITLE_LABEL', {
        en:'Title and description',
        nl:'Title'
    })

    createTranslation('CalendarComponent.TITLE_INPUT', {
        en:'Title',
        nl:'Titel'
    })

    createTranslation('CalendarComponent.BODY_INPUT', {
        en:'Description',
        nl:'Omschrijving'
    })

    createTranslation('CalendarComponent.FROM_LABEL', {
        en:'From',
        nl:'Van'
    })

    createTranslation('CalendarComponent.DATE_INPUT', {
        en:'Date',
        nl:'Datum'
    })

    createTranslation('CalendarComponent.TIME_INPUT', {
        en:'Time',
        nl:'Tijd'
    })

    createTranslation('CalendarComponent.UNTIL_LABEL', {
        en:'Until',
        nl:'Tot'
    })

    createTranslation('CalendarComponent.START_LOCATION_LABEL', {
        en:'Start location',
        nl:'Aanvangstlocatie'
    })

    createTranslation('CalendarComponent.END_LOCATION_LABEL', {
        en:'End location',
        nl:'Eindlocatie'
    })

    createTranslation('CalendarComponent.RECURRING_LABEL', {
        en:'Recurring',
        nl:'Herhalen'
    })

    function onReset(event){

        event.preventDefault()

        reset()

    }

    function goPrevious(){

        let newViewTime

        if(viewRange === 'day') newViewTime = moment(selectedViewTime).subtract(1, 'd')
        if(viewRange === 'week') newViewTime = moment(selectedViewTime).subtract(7, 'd')
        if(viewRange === 'month') newViewTime = moment(selectedViewTime).subtract(1, 'M')

        setSelectedViewTime(newViewTime)

    }

    function goNow(){

        setSelectedViewTime(Date.now())

    }

    function goNext(){

        let newViewTime

        if(viewRange === 'day') newViewTime = moment(selectedViewTime).add(1, 'd')
        if(viewRange === 'week') newViewTime = moment(selectedViewTime).add(7, 'd')
        if(viewRange === 'month') newViewTime = moment(selectedViewTime).add(1, 'M')

        setSelectedViewTime(newViewTime)

    }

    function adjustViewRange(mode){

        setViewRange(mode)

    }

    function adjustViewMode(mode){

        setPreviousViewMode(previous => { return previous })

        setViewMode(mode)

    }

    async function createEvent(data){

        data._id = selectedEvent._id
        data.active = true

        const result = await onCreateEvent(data)

        setEvents(previous => {

            return [...previous, result.data]

        })

        setViewMode('calendar')

    }

    async function updateEvent(data){

        data._id = selectedEvent._id

        const result = await onUpdateEvent(data)

        setEvents(previous => {

            return previous.map(e => {

                if(result.data._id === e._id) return result.data

                return e

            })

        })

        setViewMode('calendar')

    }

    async function deleteEvent(){

        const result = await onDeleteEvent(selectedEvent)

        setEvents(previous => {

            return previous.filter(e => e._id !== selectedEvent._id)

        })

        setViewMode('calendar')

    }

    useEffect(() => {

        const range = []

        if(viewRange === 'day'){

            const date = moment(selectedViewTime)
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

            const dayOfWeek = moment(selectedViewTime).day()
            const msPerDay = 1000 * 60 * 60 * 24

            for(let i = 0; i < 7; i++){

                const date = moment(selectedViewTime + ((1 - dayOfWeek + i) * msPerDay))
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

            const daysInMonth = moment(selectedViewTime).daysInMonth()
            const firstMonthDayInWeekdayNumber = moment(selectedViewTime).startOf('month').weekday()
            const lastMonthDayInWeekdayNumber = moment(selectedViewTime).endOf('month').weekday()
            const dayNumberOfMonth = moment(selectedViewTime).date()
            const msPerDay = 1000 * 60 * 60 * 24
            const remainingDaysOfLastMonth = firstMonthDayInWeekdayNumber === 0 ? -7 : 0 - firstMonthDayInWeekdayNumber
            const remainingDaysOfNextMonth = lastMonthDayInWeekdayNumber === 0 ? 0 : 7 - lastMonthDayInWeekdayNumber

            for(let i = remainingDaysOfLastMonth; i < daysInMonth + remainingDaysOfNextMonth; i++){

                const date = moment(selectedViewTime + ((1 - dayNumberOfMonth + i) * msPerDay))
                const dateFormatted = date.format('DD-MM-YYYY')
                const dayOfMonth = moment(date).date()
                const monthNumber = moment(date).month()
                const month = moment(date).month(monthNumber).format('MMMM')
                const startOfDay = parseFloat(moment(date).startOf('day').format('x'))
                const endOfDay = parseFloat(moment(date).endOf('day').format('x'))
                const isMainMonth = monthNumber === moment(selectedViewTime).month() ? true : false

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
                        <div
                            key={d.dateFormatted}
                            className={`${styles.day} ${viewRange === 'month' && !d.isMainMonth && createStyle([styles, customStyles], 'lowTransparency') || ''}`}
                            onClick={evt => {

                                if(viewRange === 'month' && d.isMainMonth || viewRange !== 'month'){

                                    evt.stopPropagation()

                                    setViewMode('create event')
                                    setSelectedEvent({})
                                    reset({})

                                }

                            }}
                        >
                            {
                                viewRange === 'week'
                                || viewRange === 'month'
                                ? (
                                    <div
                                        className={`${createStyle([styles, customStyles], 'date')} ${d.dateFormatted === moment().format('DD-MM-YYYY') && createStyle([styles, customStyles], 'currentDay') || ''}`}
                                    >
                                        {/*
                                            d.isMainMonth || viewRange === 'week'
                                            ? (
                                                <AiFillPlusCircle
                                                    className={`${viewRange === 'day' ? createStyle([styles, customStyles], 'createEventButton') : createStyle([styles, customStyles], 'invisibleCreateEventButton')}`}
                                                    size={19}
                                                />
                                            )
                                            : null
                                        */}
                                        {
                                            (
                                                viewRange === 'week' && j === 0
                                            ) || (
                                                viewRange === 'month' && j === 1
                                            ) || (
                                                range.length > 1 && range[j - 1].month !== d.month
                                            )
                                            ? (
                                                <div className={createStyle([styles, customStyles], 'month')}>
                                                    {d.month}
                                                </div>
                                            )
                                            : null
                                        }
                                        <div className={createStyle([styles, customStyles], 'dayOfMonth')}>
                                            {d.dayOfMonth}
                                        </div>
                                    </div>
                                )
                                : null
                            }
                            {
                                events.map(calenderEvent => {

                                    const fromDateSplitted = calenderEvent.date.from.split('-')
                                    const fromTimeSplitted = calenderEvent.time.from.split(':')

                                    const untilDateSplitted = calenderEvent.date.until.split('-')
                                    const untilTimeSplitted = calenderEvent.time.until.split(':')

                                    const fromDateTimeInTimestamp = new Date()
                                    fromDateTimeInTimestamp.setYear(fromDateSplitted[0])
                                    fromDateTimeInTimestamp.setMonth(fromDateSplitted[1] - 1)
                                    fromDateTimeInTimestamp.setDate(fromDateSplitted[2])
                                    fromDateTimeInTimestamp.setHours(fromTimeSplitted[0])
                                    fromDateTimeInTimestamp.setMinutes(fromTimeSplitted[1])

                                    const untilDateTimeInTimestamp = new Date()
                                    untilDateTimeInTimestamp.setYear(untilDateSplitted[0])
                                    untilDateTimeInTimestamp.setMonth(untilDateSplitted[1] - 1)
                                    untilDateTimeInTimestamp.setDate(untilDateSplitted[2])
                                    untilDateTimeInTimestamp.setHours(untilTimeSplitted[0])
                                    untilDateTimeInTimestamp.setMinutes(untilTimeSplitted[1])

                                    if(
                                        (
                                            fromDateTimeInTimestamp > d.startOfDay && fromDateTimeInTimestamp < d.endOfDay
                                        )
                                        || (
                                            fromDateTimeInTimestamp < d.endOfDay && untilDateTimeInTimestamp > d.startOfDay
                                        )
                                        // || (
                                        //     calenderEvent.dueDate > d.startOfDay && calenderEvent.dueDate < d.endOfDay
                                        // )
                                    ){

                                        return (
                                            <div
                                                key={calenderEvent._id}
                                                className={createStyle([styles, customStyles], 'eventContainer')}
                                                onClick={evt => {

                                                    if(viewRange === 'month' && d.isMainMonth || viewRange !== 'month'){

                                                        evt.stopPropagation()

                                                        setViewMode('view event')
                                                        setSelectedEvent(calenderEvent)
                                                        reset(calenderEvent)

                                                    }

                                                }}
                                            >
                                                {calenderEvent.title}
                                            </div>
                                        )

                                    }

                                })
                            }
                            {
                                viewRange === 'day'
                                ? (
                                    <div
                                        className={createStyle([styles, customStyles], 'headerButtonGroup')}
                                        style={{ margin: '10px auto 10px auto' }}
                                        >
                                        <button
                                            className={createStyle([styles, customStyles], 'headerButton')}
                                            onClick={evt => {

                                                evt.stopPropagation()

                                                setViewMode('create event')
                                                setSelectedEvent({})
                                                reset({})

                                            }}
                                            style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems:'center', padding: '10px 25px 10px 10px' }}
                                            >
                                            <AiFillPlusCircle size={25} style={{ margin: '15px' }}/>
                                            Create new event
                                        </button>
                                    </div>
                                )
                                : null
                            }
                        </div>
                    )

                }

            })

            rows.push(row)

        }

        setCalendar(rows)

    }, [viewRange, selectedViewTime, events])

    return (
        <>
        {
            <div className={createStyle([styles, customStyles], 'container')}>
                <div className={createStyle([styles, customStyles], 'header')}>
                    {
                        viewMode === 'calendar' && (
                            <div className={createStyle([styles, customStyles], 'titleContainer')}>
                                {applyTranslation(moment(selectedViewTime).format('MMMM').toUpperCase())} {moment(selectedViewTime).format('YYYY')}
                            </div>
                        )
                    }
                    {
                        viewMode === 'update event' && (
                            <div
                                className={createStyle([styles, customStyles], 'titleContainer')}
                                >
                                Update {selectedEvent.title}
                            </div>
                        )
                    }
                    {
                        viewMode === 'view event' && (
                            <div
                                className={createStyle([styles, customStyles], 'titleContainer')}
                                >
                                {selectedEvent.title}
                            </div>
                        )
                    }
                    {
                        viewMode === 'create event' && (
                            <div
                                className={createStyle([styles, customStyles], 'titleContainer')}
                                >
                                Create new event
                            </div>
                        )
                    }
                    <ButtonGroup
                        customStyles={applyStyles([styles], 'controlGroup')}
                        >
                        {
                            viewMode === 'calendar' && (
                                <Button
                                    label={applyTranslation('PREVIOUS')}
                                    onClick={() => goPrevious()}
                                    customStyles={applyStyles([styles], 'controlBtn')}
                                    />
                            )
                        }
                        {
                            viewMode === 'calendar' && (
                                <Button
                                    label={applyTranslation(
                                        (viewRange === 'day' && 'TODAY')
                                        || (viewRange === 'week' && 'THIS_WEEK')
                                        || (viewRange === 'month' && 'THIS_MONTH')
                                    )}
                                    onClick={() => goNow()}
                                    customStyles={applyStyles([styles], 'controlBtn')}
                                    />
                            )
                        }
                        {
                            viewMode === 'list' && (
                                <Button
                                    label={applyTranslation('TODAY')}
                                    onClick={() => goNow()}
                                    customStyles={applyStyles([styles], 'controlBtn')}
                                    />
                            )
                        }
                        {
                            viewMode === 'calendar' && (
                                <Button
                                    label={applyTranslation('NEXT')}
                                    onClick={() => goNext()}
                                    customStyles={applyStyles([styles], 'controlBtn')}
                                    />
                            )
                        }
                        {
                            viewMode === 'create event' && (
                                <ButtonGroup
                                    customStyles={applyStyles([styles], 'controlGroupExtraPadding')}
                                    >
                                    <Button
                                        label={applyTranslation('SAVE')}
                                        onClick={handleSubmit(createEvent)}
                                        customStyles={applyStyles([styles], 'saveBtn')}
                                        />
                                    <Button
                                        label={applyTranslation('RESET')}
                                        onClick={onReset}
                                        customStyles={applyStyles([styles], 'resetBtn')}
                                        />
                                </ButtonGroup>
                            )
                        }
                        {
                            viewMode === 'update event' && (
                                <ButtonGroup
                                    customStyles={applyStyles([styles], 'controlGroupExtraPadding')}
                                    >
                                    <Button
                                        label={applyTranslation('SAVE')}
                                        onClick={handleSubmit(updateEvent)}
                                        customStyles={applyStyles([styles], 'saveBtn')}
                                        />
                                    <Button
                                        label={applyTranslation('RESET')}
                                        onClick={onReset}
                                        customStyles={applyStyles([styles], 'resetBtn')}
                                        />
                                    <Button
                                        label={applyTranslation('DELETE')}
                                        onClick={deleteEvent}
                                        customStyles={applyStyles([styles], 'deleteBtn')}
                                        />
                                </ButtonGroup>
                            )
                        }
                        {
                            viewMode === 'view event' && (
                                <ButtonGroup
                                    customStyles={applyStyles([styles], 'controlGroupExtraPadding')}
                                    >
                                    <Button
                                        label={applyTranslation('EDIT')}
                                        onClick={evt => {

                                            evt.stopPropagation()

                                            setViewMode('update event')
                                            setSelectedEvent(selectedEvent)
                                            reset(selectedEvent)

                                        }}
                                        customStyles={applyStyles([styles], 'editBtn')}
                                        />
                                    <Button
                                        label={applyTranslation('DELETE')}
                                        onClick={deleteEvent}
                                        customStyles={applyStyles([styles], 'deleteBtn')}
                                        />
                                </ButtonGroup>
                            )
                        }
                    </ButtonGroup>
                    {
                        viewMode === 'calendar' && (
                            <ButtonGroup
                                customStyles={applyStyles([styles], 'controlGroup')}
                                >
                                <Button
                                    label={applyTranslation('DAY')}
                                    customStyles={applyStyles([styles], viewRange === 'day' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewRange('day')}
                                    />
                                <Button
                                    label={applyTranslation('WEEK')}
                                    customStyles={applyStyles([styles], viewRange === 'week' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewRange('week')}
                                    />
                                <Button
                                    label={applyTranslation('MONTH')}
                                    customStyles={applyStyles([styles], viewRange === 'month' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewRange('month')}
                                    />
                            </ButtonGroup>
                        )
                    }
                    {
                        (viewMode === 'calendar' || viewMode === 'list') && (
                            <ButtonGroup
                                customStyles={applyStyles([styles], 'controlGroup')}
                                >
                                <Button
                                    label={applyTranslation('CALENDAR')}
                                    customStyles={applyStyles([styles], viewMode === 'calendar' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewMode('calendar')}
                                    />
                                <Button
                                    label={applyTranslation('LIST')}
                                    customStyles={applyStyles([styles], viewMode === 'list' ? 'controlBtnActive' : 'controlBtn')}
                                    onClick={event => adjustViewMode('list')}
                                    />
                            </ButtonGroup>
                        )
                    }
                    {
                        (viewMode === 'create event' || viewMode === 'update event' || viewMode === 'view event') && (
                            <ButtonGroup
                                customStyles={applyStyles([styles], 'controlGroupExtraPadding')}
                                >
                                <Button
                                    label={applyTranslation('CLOSE')}
                                    onClick={event => {

                                        setSelectedEvent({})
                                        reset({})

                                        adjustViewMode(previousViewMode)

                                    }}
                                    customStyles={applyStyles([styles], 'closeBtn')}
                                    />
                            </ButtonGroup>
                        )
                    }
                </div>
                <div className={createStyle([styles, customStyles], 'content')}>
                    {
                        viewMode === 'calendar' && (
                            <div className={createStyle([styles, customStyles], 'calendarContainer')}>
                                {
                                    viewRange === 'day' && (
                                        <div className={createStyle([styles, customStyles], 'calendar')}>
                                            <div className={createStyle([styles, customStyles], 'dayViewTitle')}>
                                                {moment(selectedViewTime).format('DD MMMM YYYY')}
                                            </div>
                                            <div className={createStyle([styles, customStyles], 'dayViewContent')}>
                                                {calendar}
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    (viewRange === 'week' || viewRange === 'month') && (
                                        <div id={'calendar'} className={createStyle([styles, customStyles], 'calendar')}>
                                            <div className={styles.weekdays}>
                                                <div className={styles.weekday}>{applyTranslation('MONDAY')}</div>
                                                <div className={styles.weekday}>{applyTranslation('TUESDAY')}</div>
                                                <div className={styles.weekday}>{applyTranslation('WEDNESDAY')}</div>
                                                <div className={styles.weekday}>{applyTranslation('THURSDAY')}</div>
                                                <div className={styles.weekday}>{applyTranslation('FRIDAY')}</div>
                                                <div className={styles.weekday}>{applyTranslation('SATURDAY')}</div>
                                                <div className={styles.weekday}>{applyTranslation('SUNDAY')}</div>
                                            </div>
                                            {
                                                calendar.map((week, i) => {

                                                    return (
                                                        <div
                                                            key={i}
                                                            className={styles.week}
                                                            >
                                                            {
                                                                week.map(day => {

                                                                    return day

                                                                })
                                                            }
                                                        </div>
                                                    )

                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    {
                        viewMode === 'list' && (
                            <div className={createStyle([styles, customStyles], 'listContainer')}>
                                {
                                    events.map(event => {

                                        return (
                                            <div className={createStyle([styles, customStyles], 'listItem')} key={event._id}>
                                                <div className={createStyle([styles, customStyles], 'listItemTitle')}>
                                                    {event.title}
                                                </div>
                                                <div className={createStyle([styles, customStyles], 'listItemContent')}>
                                                    From: {moment(event.from).format()} <br />
                                                    Until: {moment(event.until).format()} <br />
                                                    Body: {event.body} <br />
                                                </div>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        )
                    }
                    {
                        (viewMode === 'view event' || viewMode === 'create event' || viewMode === 'update event') && (
                            <Form>
                                {
                                    (viewMode === 'create event' || viewMode === 'update event' ) && (
                                        <Input
                                            name={'title'}
                                            label={applyTranslation('CalendarComponent.TITLE_INPUT')}
                                            defaultValue={selectedEvent?.title}
                                            register={register}
                                            errors={errors}
                                            />
                                    )
                                }
                                <Textarea
                                    name={'body'}
                                    label={applyTranslation('CalendarComponent.BODY_INPUT')}
                                    defaultValue={selectedEvent?.body}
                                    readOnly={viewMode === 'view event' ? true : false}
                                    register={register}
                                    errors={errors}
                                    />
                                <div className={styles.categoryLabel}>
                                    {applyTranslation('CalendarComponent.FROM_LABEL')}
                                </div>
                                <Input
                                    label={applyTranslation('CalendarComponent.DATE_INPUT')}
                                    type={'date'}
                                    name={'date.from'}
                                    defaultValue={selectedEvent?.date?.from}
                                    readOnly={viewMode === 'view event' ? true : false}
                                    register={register}
                                    errors={errors}
                                    />
                                <Input
                                    label={applyTranslation('CalendarComponent.TIME_INPUT')}
                                    type={'time'}
                                    name={'time.from'}
                                    defaultValue={selectedEvent?.time?.from}
                                    readOnly={viewMode === 'view event' ? true : false}
                                    register={register}
                                    errors={errors}
                                    />
                                <div className={styles.categoryLabel}>
                                    {applyTranslation('CalendarComponent.UNTIL_LABEL')}
                                </div>
                                <Input
                                    label={applyTranslation('CalendarComponent.DATE_INPUT')}
                                    type={'date'}
                                    name={'date.until'}
                                    defaultValue={selectedEvent?.date?.until}
                                    readOnly={viewMode === 'view event' ? true : false}
                                    register={register}
                                    errors={errors}
                                    />
                                <Input
                                    label={applyTranslation('CalendarComponent.TIME_INPUT')}
                                    type={'time'}
                                    name={'time.until'}
                                    defaultValue={selectedEvent?.time?.until}
                                    readOnly={viewMode === 'view event' ? true : false}
                                    register={register}
                                    errors={errors}
                                    />
                                <div className={styles.categoryLabel}>
                                    {applyTranslation('CalendarComponent.START_LOCATION_LABEL')}
                                </div>
                                <LocationInput
                                    name={'location.start'}
                                    fields={[
                                        {
                                            label:applyTranslation('LABEL'),
                                            name:'label',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('STREET'),
                                            name:'street',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('NUMBER'),
                                            name:'number',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('ZIPCODE'),
                                            name: 'zipCode',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('CITY'),
                                            name: 'city',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('PROVINCE'),
                                            name:'province',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('COUNTRY'),
                                            name:'country',
                                            readOnly:viewMode === 'view event' ? true : false
                                        }
                                    ]}
                                    register={register}
                                    errors={errors}
                                    />
                                <div className={styles.categoryLabel}>
                                    {applyTranslation('CalendarComponent.END_LOCATION_LABEL')}
                                </div>
                                <LocationInput
                                    name={'location.end'}
                                    fields={[
                                        {
                                            label:applyTranslation('LABEL'),
                                            name:'label',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('STREET'),
                                            name:'street',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('NUMBER'),
                                            name:'number',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('ZIPCODE'),
                                            name: 'zipCode',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('CITY'),
                                            name: 'city',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('PROVINCE'),
                                            name:'province',
                                            readOnly:viewMode === 'view event' ? true : false
                                        },
                                        {
                                            label:applyTranslation('COUNTRY'),
                                            name:'country',
                                            readOnly:viewMode === 'view event' ? true : false
                                        }
                                    ]}
                                    register={register}
                                    errors={errors}
                                    />
                                <div className={styles.categoryLabel}>
                                    {applyTranslation('CalendarComponent.RECURRING_LABEL')}
                                </div>
                            </Form>

                        )
                    }
                </div>
            </div>
        }
        </>
    )

}
