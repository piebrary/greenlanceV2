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

import { AiFillPlusCircle } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'

import { createStyle } from '../../utils/createStyle'
import { applyStyles } from '../../utils/applyStyles'
import { containsNumber } from '../../utils/containsNumber'

import styles from './Calendar.module.css'

export default function Calendar({ customStyles, events, onCreateEvent, onUpdateEvent, onDeleteEvent }){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)

    const { register, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm()

    const [viewRange, setViewRange] = useState('month')
    const [viewMode, setViewMode] = useState('calendar')
    const [previousViewMode, setPreviousViewMode] = useState('calendar')
    const [calendar, setCalendar] = useState([])
    const [currentViewTime, setCurrentViewTime] = useState(Date.now())
    const [detailsJSX, setDetailsJSX] = useState([])
    const [currentActiveEvent, setCurrentActiveEvent] = useState({})

    useEffect(() => {

        console.log('new rerender')

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

    createTranslation('CalendarComponent.STREET', {
        en:'Street',
        nl:'Straat'
    })

    createTranslation('CalendarComponent.NUMBER', {
        en:'Number',
        nl:'Nummer'
    })

    createTranslation('CalendarComponent.ZIPCODE', {
        en:'Zip code',
        nl:'Postcode'
    })

    createTranslation('CalendarComponent.CITY', {
        en:'City',
        nl:'Stad'
    })

    createTranslation('CalendarComponent.PROVINCE', {
        en:'Province',
        nl:'Provincie'
    })

    createTranslation('CalendarComponent.COUNTRY', {
        en:'Country',
        nl:'Land'
    })

    createTranslation('CalendarComponent.RECURRING_LABEL', {
        en:'Recurring',
        nl:'Herhalen'
    })



    function onSubmit(data){

        const updatedEvent = {}

        updatedEvent._id = currentActiveEvent._id
        updatedEvent.title = data.titleInput
        updatedEvent.body = data.bodyInput
        updatedEvent.location = data.location
        updatedEvent.time = {}
        updatedEvent.recurring = data.recurring

        const fromDateSplitted = data.time.from.date.split('-')
        const fromTimeSplitted = data.time.from.time.split(':')

        let newFromDate

        newFromDate = moment().date(fromDateSplitted[0])
        newFromDate = moment(newFromDate).month(fromDateSplitted[1])
        newFromDate = moment(newFromDate).year(fromDateSplitted[2])

        newFromDate = moment(newFromDate).hour(fromTimeSplitted[0])
        newFromDate = moment(newFromDate).minutes(fromTimeSplitted[1])

        updatedEvent.time.from = newFromDate.valueOf()

        const untilDateSplitted = data.time.until.date.split('-')
        const untilTimeSplitted = data.time.until.time.split(':')

        let newUntilDate

        newUntilDate = moment().date(untilDateSplitted[0])
        newUntilDate = moment(newUntilDate).month(untilDateSplitted[1])
        newUntilDate = moment(newUntilDate).year(untilDateSplitted[2])

        newUntilDate = moment(newUntilDate).hour(untilTimeSplitted[0])
        newUntilDate = moment(newUntilDate).minutes(untilTimeSplitted[1])

        updatedEvent.time.until = newUntilDate.valueOf()

        onUpdateEvent(updatedEvent)

    }

    function onReset(event){

        event.preventDefault()

        reset()

    }

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

    function createEvent(){

        onCreateEvent(currentActiveEvent)

    }

    function deleteEvent(){

        onDeleteEvent(currentActiveEvent)

    }

    function onReset(event){

        if(event) event.preventDefault()

        reset()
    }

    function openDetailsView(event, action, data){

        event.stopPropagation()

        onReset()

        if(action === 'newEvent'){

            setViewMode('newEvent')
            setCurrentActiveEvent()
            setDetailsJSX(() => {

                return (
                    <>
                        This si empty
                    </>
                )

            })

        }

        if(action === 'editEvent'){

            setViewMode('editEvent')
            setCurrentActiveEvent(data)
            setDetailsJSX(() => {

                console.log(data)

                return (
                    <>
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            >
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.TITLE_LABEL')}
                            </div>
                            <Input
                                label={applyTranslation('CalendarComponent.TITLE_INPUT')}
                                name={'titleInput'}
                                type={'text'}
                                defaultValue={data.title}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.BODY_INPUT')}
                                name={'bodyInput'}
                                type={'text'}
                                textarea={true}
                                defaultValue={data.body}
                                register={register}
                                errors={errors}
                                />
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.FROM_LABEL')}
                            </div>

                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.UNTIL_LABEL')}
                            </div>

                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.START_LOCATION_LABEL')}
                            </div>
                            <LocationInput
                                defaultValue={data.location.start}
                                name={'location.start'}
                                fields={[
                                    {
                                        name:applyTranslation('CalendarComponent.STREET'),
                                        key:'street'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.NUMBER'),
                                        key:'number'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.ZIPCODE'),
                                        key: 'zipCode'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.CITY'),
                                        key: 'city'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.PROVINCE'),
                                        key:'province'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.COUNTRY'),
                                        key:'country'
                                    }
                                ]}
                                register={register}
                                errors={errors}
                                />
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.END_LOCATION_LABEL')}
                            </div>
                            <LocationInput
                                defaultValue={data.location.end}
                                name={'location.end'}
                                fields={[
                                    {
                                        name:applyTranslation('CalendarComponent.STREET'),
                                        key:'street'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.NUMBER'),
                                        key:'number'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.ZIPCODE'),
                                        key: 'zipCode'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.CITY'),
                                        key: 'city'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.PROVINCE'),
                                        key:'province'
                                    },
                                    {
                                        name:applyTranslation('CalendarComponent.COUNTRY'),
                                        key:'country'
                                    }
                                ]}
                                register={register}
                                errors={errors}
                                />
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.RECURRING_LABEL')}
                            </div>
                        </Form>
                    </>
                )

            })

        }

        if(action === 'viewEvent'){

            setViewMode('viewEvent')
            setCurrentActiveEvent(data)
            setDetailsJSX(() => {

                console.log(data)

                return (
                    <>
                        <Form>
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.TITLE_LABEL')}
                            </div>
                            <Input
                                label={applyTranslation('CalendarComponent.TITLE_INPUT')}
                                type={'text'}
                                defaultValue={data.title}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.BODY_INPUT')}
                                type={'text'}
                                textarea={true}
                                defaultValue={data.body}
                                readOnly={true}
                                />
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.FROM_LABEL')}
                            </div>
                            <Input
                                label={applyTranslation('CalendarComponent.DATE_INPUT')}
                                type={'text'}
                                defaultValue={data.time.from}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.TIME_INPUT')}
                                type={'text'}
                                defaultValue={data.time.from}
                                readOnly={true}
                                />
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.UNTIL_LABEL')}
                            </div>
                            <Input
                                label={applyTranslation('CalendarComponent.DATE_INPUT')}
                                type={'text'}
                                defaultValue={data.time.until}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.TIME_INPUT')}
                                type={'text'}
                                defaultValue={data.time.until}
                                readOnly={true}
                                />
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.START_LOCATION_LABEL')}
                            </div>
                            <Input
                                label={applyTranslation('CalendarComponent.STREET')}
                                type={'text'}
                                defaultValue={data.location.start.street}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.NUMBER')}
                                type={'text'}
                                defaultValue={data.location.start.number}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.ZIPCODE')}
                                type={'text'}
                                defaultValue={data.location.start.zipCode}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.CITY')}
                                type={'text'}
                                defaultValue={data.location.start.city}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.PROVINCE')}
                                type={'text'}
                                defaultValue={data.location.start.province}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.COUNTRY')}
                                type={'text'}
                                defaultValue={data.location.start.country}
                                readOnly={true}
                                />
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.END_LOCATION_LABEL')}
                            </div>
                            <Input
                                label={applyTranslation('CalendarComponent.STREET')}
                                type={'text'}
                                defaultValue={data.location.end.street}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.NUMBER')}
                                type={'text'}
                                defaultValue={data.location.end.number}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.ZIPCODE')}
                                type={'text'}
                                defaultValue={data.location.end.zipCode}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.CITY')}
                                type={'text'}
                                defaultValue={data.location.end.city}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.PROVINCE')}
                                type={'text'}
                                defaultValue={data.location.end.province}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('CalendarComponent.COUNTRY')}
                                type={'text'}
                                defaultValue={data.location.end.country}
                                readOnly={true}
                                />
                            <div className={styles.categoryLabel}>
                                {applyTranslation('CalendarComponent.RECURRING_LABEL')}
                            </div>
                        </Form>
                    </>
                )

            })

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
                            className={`${viewRange === 'month' && !d.isMainMonth && createStyle([styles, customStyles], 'lowTransparency')}`}
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
                                        className={`${createStyle([styles, customStyles], 'date')} ${d.dateFormatted === moment().format('DD-MM-YYYY') && createStyle([styles, customStyles], 'currentDay')}`}
                                    >
                                        {
                                            d.isMainMonth || viewRange === 'week'
                                            ? (
                                                <AiFillPlusCircle
                                                    className={`${viewRange === 'day' ? createStyle([styles, customStyles], 'createEventButton') : createStyle([styles, customStyles], 'invisibleCreateEventButton')}`}
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

                                    if(
                                        (
                                            calenderEvent.time.from > d.startOfDay && calenderEvent.time.from < d.endOfDay
                                        ) || (
                                            calenderEvent.time.from < d.endOfDay && calenderEvent.time.until > d.startOfDay
                                        ) || (
                                            calenderEvent.dueDate > d.startOfDay && calenderEvent.dueDate < d.endOfDay
                                        )
                                    ){

                                        return (
                                            <div
                                                key={calenderEvent._id}
                                                className={createStyle([styles, customStyles], 'eventContainer')}
                                                onClick={evt => {

                                                    if(viewRange === 'month' && d.isMainMonth || viewRange !== 'month'){

                                                        openDetailsView(evt, 'viewEvent', calenderEvent)

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
                                            onClick={evt => openDetailsView(evt, 'newEvent')}
                                            style={{ fontSize: '20px', display: 'flex', justifyContent: 'center', alignItems:'center', padding: '10px 25px 10px 10px' }}
                                            >
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
            <div className={createStyle([styles, customStyles], 'container')}>
                <div className={createStyle([styles, customStyles], 'header')}>
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
                            viewMode === 'newEvent' && (
                                <ButtonGroup
                                    customStyles={applyStyles([styles], 'controlGroupExtraPadding')}
                                    >
                                    <Button
                                        label={applyTranslation('SAVE')}
                                        onClick={event => createEvent(event)}
                                        customStyles={applyStyles([styles], 'controlBtn')}
                                        />
                                    <Button
                                        label={applyTranslation('RESET')}
                                        onClick={onReset}
                                        customStyles={applyStyles([styles], 'controlBtn')}
                                        />
                                </ButtonGroup>
                            )
                        }
                        {
                            viewMode === 'editEvent' && (
                                <ButtonGroup
                                    customStyles={applyStyles([styles], 'controlGroupExtraPadding')}
                                    >
                                    <Button
                                        label={applyTranslation('SAVE')}
                                        onClick={handleSubmit(onSubmit)}
                                        customStyles={applyStyles([styles], 'controlBtn')}
                                        />
                                    <Button
                                        label={applyTranslation('RESET')}
                                        onClick={onReset}
                                        customStyles={applyStyles([styles], 'controlBtn')}
                                        />
                                    <Button
                                        label={applyTranslation('DELETE')}
                                        onClick={event => deleteEvent(event)}
                                        customStyles={applyStyles([styles], 'controlBtn')}
                                        />
                                </ButtonGroup>
                            )
                        }
                        {
                            viewMode === 'viewEvent' && (
                                <ButtonGroup
                                    customStyles={applyStyles([styles], 'controlGroupExtraPadding')}
                                    >
                                    <Button
                                        label={applyTranslation('EDIT')}
                                        onClick={event => openDetailsView(event, 'editEvent', currentActiveEvent)}
                                        customStyles={applyStyles([styles], 'controlBtn')}
                                        />
                                    <Button
                                        label={applyTranslation('DELETE')}
                                        onClick={event => deleteEvent(event)}
                                        customStyles={applyStyles([styles], 'controlBtn')}
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
                        viewMode === 'newEvent' && (
                            <div
                                className={createStyle([styles, customStyles], 'titleContainer')}
                                >
                                Create new event
                            </div>
                        )
                    }
                    {
                        viewMode === 'editEvent' && (
                            <div
                                className={createStyle([styles, customStyles], 'titleContainer')}
                                >
                                Update {currentActiveEvent.title}
                            </div>
                        )
                    }
                    {
                        viewMode === 'viewEvent' && (
                            <div
                                className={createStyle([styles, customStyles], 'titleContainer')}
                                >
                                {currentActiveEvent.title}
                            </div>
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
                        (viewMode === 'newEvent' || viewMode === 'editEvent' || viewMode === 'viewEvent') && (
                            <ButtonGroup
                                customStyles={applyStyles([styles], 'controlGroupExtraPadding')}
                                >
                                <Button
                                    label={applyTranslation('CLOSE')}
                                    onClick={event => {

                                        setCurrentActiveEvent()

                                        adjustViewMode(previousViewMode)

                                    }}
                                    customStyles={applyStyles([styles], 'controlBtn')}
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
                                        <div className={createStyle([styles, customStyles], 'calendar')}>
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
                        (viewMode === 'newEvent' || viewMode === 'editEvent' || viewMode === 'viewEvent') && (
                            <>
                                {detailsJSX}
                            </>
                        )
                    }
                </div>
            </div>
        }
        </>
    )

}
