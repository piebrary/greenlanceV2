import { useState, useEffect, useContext } from 'react'

import moment from 'moment'

import { LanguageContext } from '../../../contexts/LanguageContext'
import { UserContext } from '../../../contexts/UserContext'

import Button from '../../button/Button'
import ButtonGroup from '../../buttonGroup/ButtonGroup'
import Grid from '../../grid/Grid'

import { AiOutlineClose } from 'react-icons/ai'
import { MdOutlineNavigateBefore } from 'react-icons/md'
import { MdOutlineNavigateNext } from 'react-icons/md'

import styles from './DatePicker.module.css'

import { createStyle } from '../../../utils/createStyle'
import { applyStyles } from '../../../utils/applyStyles'

export default function DatePicker({ customStyles, label, name, min, max, defaultValue, register, setValue }){

    const { applyTranslation } = useContext(LanguageContext)
    const { settings } = useContext(UserContext)

    min = min ? moment(min) : undefined
    max = max ? moment(max) : undefined
    defaultValue = defaultValue ? moment(defaultValue) : moment()

    const startDateWithBoundaries = createDateWithBoundaries(defaultValue, min, max)

    const [currentOpenPicker, setCurrentOpenPicker] = useState()
    const [selectedDate, setSelectedDate] = useState(startDateWithBoundaries)
    const [viewDate, setViewDate] = useState(startDateWithBoundaries)
    const [dateSheet, setDateSheet] = useState([])
    const [monthSheet, setMonthSheet] = useState([...moment.months()])
    const [yearSheet, setYearSheet] = useState([])

    const reg = register && register(name)

    useEffect(() => {

        const dates = []

        const curDay = moment(viewDate).date()
        const curMon = moment(viewDate).month()
        const curMonDays = moment(viewDate).daysInMonth()
        const curMonStartWeekday = moment(viewDate).startOf('month').weekday() === 0 ? 7 : moment(viewDate).startOf('month').weekday()
        const curMonEndWeekday = moment(viewDate).endOf('month').weekday()

        const prevMon = curMon === 0 ? 11 : curMon - 1
        const prevMonDays = moment(viewDate).subtract(1, 'months').daysInMonth()

        const nextMon = curMon === 11 ? 0 : curMon + 1

        for(let i = prevMonDays - (curMonStartWeekday - 2); i <= prevMonDays; i++){

            dates.push(moment(viewDate).subtract(curDay + (prevMonDays - i), 'days'))

        }

        for(let i = 1; i <= curMonDays; i++){

            dates.push(moment(viewDate).subtract((curDay - i), 'days'))

        }

        for(let i = 1; i <= 7 - curMonEndWeekday; i++){

            dates.push(moment(viewDate).add((curMonDays - curDay) + i, 'days'))

        }

        if(dates.length === 35){

            for(let i = 0; i < 7; i++){

                dates.push(moment(dates[dates.length - 1]).add(1, 'day'))

            }

        }

        setDateSheet(dates)

        const years = []

        const curYear = moment(viewDate).year()

        for(let i = curYear - 4; i <= curYear + 4; i++){

            years.push(i)

        }

        setYearSheet(years)

    }, [viewDate])

    useEffect(() => {

        // server must check the users format to get the correct date
        setValue(name, moment(selectedDate).format(settings.dateFormat))

    }, [selectedDate])

    function createDateWithBoundaries(date, min, max){

        return (
            min && min > date
            ? moment(min)
            : max && max < date
            ? moment(max)
            : moment(date)
        )

    }

    function selectDate(event, date){

        event && event.preventDefault()

        const dateWithBoundaries = createDateWithBoundaries(date, min, max)

        setSelectedDate(dateWithBoundaries)
        setViewDate(dateWithBoundaries)

    }

    function selectMonth(event, month){

        event && event.preventDefault()

        const newDate = moment(selectedDate.set('month', month))
        const dateWithBoundaries = createDateWithBoundaries(newDate, min, max)

        setSelectedDate(dateWithBoundaries)
        setViewDate(dateWithBoundaries)
        setCurrentOpenPicker('day')

    }

    function selectYear(event, year){

        event && event.preventDefault()

        const newDate = moment(selectedDate.set('year', year))
        const dateWithBoundaries = createDateWithBoundaries(newDate, min, max)

        setSelectedDate(dateWithBoundaries)
        setViewDate(dateWithBoundaries)
        setCurrentOpenPicker('day')

    }

    function cancelDateSelection(event){

        event.preventDefault()

        // setSelectedDate(previous => {
        //     return previous
        // })

        setCurrentOpenPicker()

    }

    function goPreviousMonth(event){

        event && event.preventDefault()

        setViewDate(previous => {

            return moment(previous).subtract(1, 'month')

        })

    }

    function goNextMonth(event){

        event && event.preventDefault()

        setViewDate(previous => {

            return moment(previous).add(1, 'month')

        })

    }

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            {
                label && (
                    <label
                        htmlFor={name}
                        className={createStyle([styles, customStyles], 'label')}
                        >
                        {label}
                    </label>
                )
            }
            <div className={createStyle([styles, customStyles], 'dateContainer')}>
                <input
                    className={createStyle([styles, customStyles], 'selectedDate')}
                    onClick={() => currentOpenPicker !== 'day' ? setCurrentOpenPicker('day') : setCurrentOpenPicker() }
                    defaultValue={moment(defaultValue).format(settings.dateFormat)}
                    readOnly={true}
                    {...reg}
                    />
                {
                    currentOpenPicker && min && !max && (
                        <div className={styles.boundariesInfo}>
                            From {moment(min).format(settings.dateFormat)}
                        </div>
                    )
                }
                {
                    currentOpenPicker && max && !min && (
                        <div className={styles.boundariesInfo}>
                            Until {moment(max).format(settings.dateFormat)}
                        </div>
                    )
                }
                {
                    currentOpenPicker && min && max && (
                        <div className={styles.boundariesInfo}>
                            Between {moment(min).format(settings.dateFormat)} and {moment(max).format(settings.dateFormat)}
                        </div>
                    )
                }
                {
                    currentOpenPicker === 'day' && (
                        <div className={createStyle([styles, customStyles], 'datePicker')}>
                            <Grid
                                customStyles={applyStyles([styles, customStyles], 'daysGrid')}
                                >
                                <Button
                                    customStyles={applyStyles([styles, customStyles], 'previousBtn')}
                                    label={<MdOutlineNavigateBefore size={20} />}
                                    onClick={goPreviousMonth}
                                    />
                                <Button
                                    customStyles={applyStyles([styles, customStyles], 'nextBtn')}
                                    label={<MdOutlineNavigateNext size={20} />}
                                    onClick={goNextMonth}
                                    />
                                <div
                                    className={styles.monthYearTitle}
                                    >
                                    <div
                                        key={'monthBtn'}
                                        className={[styles.period, styles.isSelectable].join(' ')}
                                        onClick={event => {
                                            event.preventDefault()
                                            setCurrentOpenPicker('month')
                                        }}
                                        >
                                        {applyTranslation(moment(viewDate).format('MMMM').toUpperCase())}
                                    </div>
                                    <div
                                        key={'yearBtn'}
                                        className={[styles.period, styles.isSelectable].join(' ')}
                                        onClick={event => {
                                            event.preventDefault()
                                            setCurrentOpenPicker('year')
                                        }}
                                        >
                                        {applyTranslation(moment(viewDate).format('YYYY').toUpperCase())}
                                    </div>
                                </div>
                                <Button
                                    customStyles={applyStyles([styles, customStyles], 'cancelBtn')}
                                    label={<AiOutlineClose size={20} />}
                                    onClick={cancelDateSelection}
                                    />
                                {
                                    dateSheet.map(date => {

                                        const classList = [styles.period]

                                        classList.push(moment(date).month() === moment(viewDate).month() ? styles.dayOfCurMon : styles.dayOfOtherMon)

                                        if(
                                            (!min || (min && moment(date).startOf('day') >= moment(min).startOf('day')))
                                            && (!max || (max && moment(date).startOf('day') <= moment(max).startOf('day')))
                                        ){

                                            classList.push(styles.isSelectable)

                                        } else {

                                            classList.push(styles.outOfBounds)

                                        }

                                        if(moment(date).startOf('day').isSame(moment(selectedDate).startOf('day'))){

                                            classList.push(styles.daySelected)

                                        }

                                        return (
                                            <div
                                                key={date}
                                                className={classList.join(' ')}
                                                onClick={event => selectDate(event, date)}
                                                >
                                                {moment(date).date()}
                                            </div>
                                        )

                                    })
                                }
                            </Grid>
                        </div>
                    )
                }
                {
                    currentOpenPicker === 'month' && (
                        <div className={createStyle([styles, customStyles], 'datePicker')}>
                            <Grid
                                customStyles={applyStyles([styles, customStyles], 'monthsGrid')}
                                >
                                {
                                     monthSheet.map(month => {

                                        const classList = [styles.period]

                                        classList.push(moment(viewDate).set('month', month) > min && moment(viewDate).set('month', month) < max ? styles.dayOfCurMon : styles.dayOfOtherMon)

                                        if(
                                            (min && moment(viewDate).set('month', month).startOf('month') >= moment(min).startOf('month'))
                                            && (max && moment(viewDate).set('month', month).startOf('month') <= moment(max).startOf('month'))
                                        ){

                                            classList.push(styles.isSelectable)

                                        } else {

                                            classList.push(styles.outOfBounds)

                                        }

                                        if(moment(moment(viewDate).set('month', month)).startOf('month').isSame(moment(selectedDate).startOf('month'))){

                                            classList.push(styles.daySelected)

                                        }

                                        return (
                                            <div
                                                key={month}
                                                className={classList.join(' ')}
                                                onClick={event => selectMonth(event, month)}
                                                >
                                                {applyTranslation(month.toUpperCase())}
                                            </div>
                                        )

                                    })
                                }
                            </Grid>
                        </div>
                    )
                }
                {
                    currentOpenPicker === 'year' && (
                        <div className={createStyle([styles, customStyles], 'datePicker')}>
                            <Grid
                                customStyles={applyStyles([styles, customStyles], 'yearsGrid')}
                                >
                                {
                                    yearSheet.map(year => {

                                        const classList = [styles.period]

                                        classList.push(moment(viewDate).set('year', year) > min && moment(viewDate).set('year', year) < max ? styles.dayOfCurMon : styles.dayOfOtherMon)

                                        if(
                                            (min && moment(viewDate).set('year', year).startOf('year') >= moment(min).startOf('year'))
                                            && (max && moment(viewDate).set('year', year).startOf('year') <= moment(max).startOf('year'))
                                        ){

                                            classList.push(styles.isSelectable)

                                        } else {

                                            classList.push(styles.outOfBounds)

                                        }

                                        if(moment(moment(viewDate).set('year', year)).startOf('year').isSame(moment(selectedDate).startOf('year'))){

                                            classList.push(styles.daySelected)

                                        }

                                        return (
                                            <div
                                                key={year}
                                                className={classList.join(' ')}
                                                onClick={event => selectYear(event, year)}
                                                >
                                                {year}
                                            </div>
                                        )

                                    })
                                }
                            </Grid>
                        </div>
                    )
                }
            </div>
        </div>
    )

}
