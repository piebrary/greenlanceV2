import { useState, useEffect, useContext } from 'react'

import moment from 'moment'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Button from '../button/Button'
import ButtonGroup from '../buttonGroup/ButtonGroup'
import Grid from '../grid/Grid'

import { AiOutlineClose } from 'react-icons/ai'
import { MdOutlineNavigateBefore } from 'react-icons/md'
import { MdOutlineNavigateNext } from 'react-icons/md'

import { dateFormatOptions } from '../../assets/js/settings/dateFormat'

import styles from './DatePicker.module.css'

import { generateStyles } from '../../utils/generateStyles'
import { filterStyles } from '../../utils/filterStyles'
import { formatDate } from '../../utils/formatDate'

export default function DatePicker({ customStyles, label, name, min, max, register, startDate = Date.now() }){

    const { translate } = useContext(LanguageContext)
    const { settings } = useContext(UserContext)

    const startDateWithBoundaries = (
        min && moment(min) > moment(startDate)
        ? moment(min)
        : max && moment(max) < moment(startDate)
        ? moment(max)
        : moment(startDate)
    )

    const [isPickerOpen, setIsPickerOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(startDateWithBoundaries)
    const [viewDate, setViewDate] = useState(startDateWithBoundaries)
    const [dateSheet, setDateSheet] = useState([])

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

    }, [viewDate])

    function selectDate(event, date){

        event.preventDefault()

        const dateWithBoundaries = (
            min && moment(min) > moment(date)
            ? moment(min)
            : max && moment(max) < moment(date)
            ? moment(max)
            : moment(date)
        )

        setSelectedDate(dateWithBoundaries)

    }

    function cancelDateSelection(event){

        event.preventDefault()

        setSelectedDate(previous => {
            return previous
        })

        setIsPickerOpen(false)

    }

    function goPreviousMonth(event){

        event.preventDefault()

        setViewDate(previous => {

            return moment(previous).subtract(1, 'month')

        })

    }

    function goNextMonth(event){

        event.preventDefault()

        setViewDate(previous => {

            return moment(previous).add(1, 'month')

        })

    }

    return (
        <div className={generateStyles([styles, customStyles], 'container')}>
            {
                label && (
                    <label
                        htmlFor={name}
                        className={generateStyles([styles, customStyles], 'label')}
                        >
                        {label}
                    </label>
                )
            }
            <div className={generateStyles([styles, customStyles], 'dateContainer')}>
                <div
                    className={generateStyles([styles, customStyles], 'selectedDate')}
                    onClick={() => setIsPickerOpen(!isPickerOpen)}
                    {...reg}
                    >
                    {moment(selectedDate).format(settings.dateFormat)}
                </div>
                {
                    isPickerOpen && (
                        <div className={generateStyles([styles, customStyles], 'datePicker')}>
                            <Grid
                                customStyles={filterStyles([styles, customStyles], 'daysGrid')}
                                >
                                <Button
                                    customStyles={filterStyles([styles, customStyles], 'previousBtn')}
                                    label={<MdOutlineNavigateBefore size={20} />}
                                    onClick={goPreviousMonth}
                                    />
                                <Button
                                    customStyles={filterStyles([styles, customStyles], 'nextBtn')}
                                    label={<MdOutlineNavigateNext size={20} />}
                                    onClick={goNextMonth}
                                    />
                                <div
                                    className={styles.monthYearTitle}
                                    >
                                    {
                                        translate(moment(viewDate).format('MMMM').toUpperCase()) + ' ' + moment(viewDate).format('YYYY')
                                    }
                                </div>
                                <Button
                                    customStyles={filterStyles([styles, customStyles], 'cancelBtn')}
                                    label={<AiOutlineClose size={20} />}
                                    onClick={cancelDateSelection}
                                    />
                                {
                                    dateSheet.map(date => {

                                        const classList = [styles.day]

                                        classList.push(moment(date).month() === moment(viewDate).month() ? styles.dayOfCurMon : styles.dayOfOtherMon)

                                        if(
                                            (!min || (min && moment(date) > moment(min)))
                                            && (!max || (max && moment(date) < moment(max)))
                                        ){

                                            classList.push(styles.isSelectable)

                                        }

                                        if(min && moment(date) < moment(min)) classList.push(styles.outOfBounds)
                                        if(max && moment(date) > moment(max)) classList.push(styles.outOfBounds)

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
            </div>
        </div>
    )

}
