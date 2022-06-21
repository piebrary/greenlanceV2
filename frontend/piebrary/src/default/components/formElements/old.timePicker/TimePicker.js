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

import { timeFormatOptions } from '../../../assets/js/settings/timeFormat'

import styles from './TimePicker.module.css'

import { createStyle } from '../../../utils/createStyle'
import { applyStyles } from '../../../utils/applyStyles'

export default function TimePicker({ customStyles, label, name, min, max, register, defaultValue, setValue }){

    const { settings } = useContext(UserContext)

    min = min ? moment(min).format('HH:mm').split(':') : ['00', '00']
    max = max ? moment(max).format('HH:mm').split(':') : ['23', '59']
    defaultValue = defaultValue ? moment(defaultValue).format('HH:mm').split(':') : moment().format('HH:mm').split(':')

    const defaultValueWithBoundaries = createTimeWithBoundaries(defaultValue, min, max)


    const isAMPM = settings.timeFormat === 'hh:mm:ss A' ? true : false

    const [currentOpenPicker, setCurrentOpenPicker] = useState()
    const [selectedTime, setSelectedTime] = useState(defaultValueWithBoundaries)
    const [timeSheet, setTimeSheet] = useState([])
    // const [timeFormat, setTimeFormat] = useState(settings.timeFormat === 'hh:mm:ss A' ? 'AMPM' : '24h')

    const [hourSheet, setHourSheet] = useState(
        isAMPM
        ? ['00', '01', '02', '03', '04', '05', '06', '07','08', '09', '10', '11']
        : [
        '00', '01', '02', '03', '04', '05', '06', '07',
        '08', '09', '10', '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20', '21', '22', '23'
        ]
    )

    const [minuteSheet, setMinuteSheet] = useState([
        '00', '01', '02', '03', '04', '05',
        '06', '07', '08', '09', '10', '11',
        '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23',
        '24', '25', '26', '27', '28', '29',
        '30', '31', '32', '33', '34', '35',
        '36', '37', '38', '39', '40', '41',
        '42', '43', '44', '45', '46', '47',
        '48', '49', '50', '51', '52', '53',
        '54', '55', '56', '57', '58', '59'
    ])

    const reg = register && register(name)

    useEffect(() => {

        // use as format the format in which the server wants to recieve the date
        setValue(name, selectedTime.join(':'))

    }, [selectedTime])

    function createTimeWithBoundaries(time, min, max){

        const newTime = time

        if(min[0] > newTime[0]) newTime[0] = min[0]
        if(max[0] < newTime[0]) newTime[0] = max[0]

        if(min[1] > newTime[1] && newTime[0] <= min[0]) newTime[1] = min[1]
        if(max[1] < newTime[1] && newTime[0] >= max[0]) newTime[1] = max[1]

        return newTime

    }

    function selectTime(event, time){

        event && event.preventDefault()

        const timeWithBoundaries = createTimeWithBoundaries(time, min, max)

        setSelectedTime(timeWithBoundaries)
        // setViewTime(timeWithBoundaries)

    }

    function cancelTimeSelection(event){

        event && event.preventDefault()

        setCurrentOpenPicker()

    }

    function goPrevious(event){

        event && event.preventDefault()

        if(currentOpenPicker === 'hour'){

            setSelectedTime(previous => {

                const indexOfHour = hourSheet.indexOf(previous[0])

                const newTime = (
                    indexOfHour === 0
                    ? [hourSheet[hourSheet.length - 1], previous[1]]
                    : [hourSheet[indexOfHour - 1], previous[1]]
                )

                return createTimeWithBoundaries(newTime, min, max)
            })

        }

        if(currentOpenPicker === 'minute'){

            setSelectedTime(previous => {

                const indexOfMinute = minuteSheet.indexOf(previous[1])

                const newTime = (
                    indexOfMinute === 0
                    ? [previous[0], minuteSheet[minuteSheet.length - 1]]
                    : [previous[0], minuteSheet[indexOfMinute - 1]]
                )

                return createTimeWithBoundaries(newTime, min, max)
            })

        }

    }

    function goNext(event){

        event && event.preventDefault()

        if(currentOpenPicker === 'hour'){

            setSelectedTime(previous => {

                const indexOfHour = hourSheet.indexOf(previous[0])

                const newTime = (
                    indexOfHour === hourSheet.length - 1
                    ? [hourSheet[0], previous[1]]
                    : [hourSheet[indexOfHour + 1], previous[1]]
                )

                return createTimeWithBoundaries(newTime, min, max)
            })

        }

        if(currentOpenPicker === 'minute'){

            setSelectedTime(previous => {

                const indexOfMinute = minuteSheet.indexOf(previous[1])

                const newTime = (
                    indexOfMinute === minuteSheet.length - 1
                    ? [previous[0], minuteSheet[0]]
                    : [previous[0], minuteSheet[indexOfMinute + 1]]
                )

                return createTimeWithBoundaries(newTime, min, max)
            })

        }

    }

    function selectHour(event, hour){

        event && event.preventDefault()

        const newTime = [hour, selectedTime[1]]

        const timeWithBoundaries = createTimeWithBoundaries(newTime, min, max)

        setSelectedTime(timeWithBoundaries)

        setCurrentOpenPicker('minute')

    }

    function selectMinutes(event, minutes){

        event && event.preventDefault()

        const newTime = [selectedTime[0], minutes]

        const timeWithBoundaries = createTimeWithBoundaries(newTime, min, max)

        setSelectedTime(timeWithBoundaries)

        setCurrentOpenPicker(undefined)

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
            <div className={createStyle([styles, customStyles], 'timeContainer')}>
                <input
                    className={createStyle([styles, customStyles], 'selectedTime')}
                    onClick={() => currentOpenPicker !== 'hour' ? setCurrentOpenPicker('hour') : setCurrentOpenPicker() }
                    defaultValue={defaultValue.join(':')}
                    readOnly={true}
                    {...reg}
                    />
                {/*<div
                    className={createStyle([styles, customStyles], 'selectedTime')}
                    >
                    <ButtonGroup>
                        <div
                            key={'hour' + selectedTime[0]}
                            className={[styles.isSelectable, styles.dayOfCurMon].join(' ')}
                            onClick={event => {
                                event.preventDefault()
                                setCurrentOpenPicker('hour')
                            }}
                            >
                            {selectedTime[0]}
                        </div>
                        :
                        <div
                            key={'minute' + selectedTime[1]}
                            className={[styles.isSelectable, styles.dayOfCurMon].join(' ')}
                            onClick={event => {
                                event.preventDefault()
                                setCurrentOpenPicker('minute')
                            }}
                            >
                            {selectedTime[1]}
                        </div>
                    </ButtonGroup>
                </div>*/}
                {
                    currentOpenPicker && min && max && (
                        <div className={styles.boundariesInfo}>
                            Between {min[0]}:{min[1]} and {max[0]}:{max[1]}
                        </div>
                    )
                }
                {
                    currentOpenPicker === 'hour' && (
                        <div className={createStyle([styles, customStyles], 'timePicker')}>
                            <div
                                className={styles.timeGroup}
                                >
                                <Grid
                                    customStyles={applyStyles([styles, customStyles], `${isAMPM ? 'hoursGridAMPM' : 'hoursGrid24h'}`)}
                                    >
                                    {
                                        isAMPM && (
                                            <div
                                                className={styles.ampmToggleContainer}
                                                >
                                                AMPM Toggle Here
                                            </div>
                                        )
                                    }
                                    <Button
                                        customStyles={applyStyles([styles, customStyles], 'previousBtn')}
                                        label={<MdOutlineNavigateBefore size={20} />}
                                        onClick={goPrevious}
                                        />
                                    <Button
                                        customStyles={applyStyles([styles, customStyles], 'nextBtn')}
                                        label={<MdOutlineNavigateNext size={20} />}
                                        onClick={goNext}
                                        />
                                    <div
                                        className={styles.timeHoursTitle}
                                        >
                                        Hours
                                    </div>
                                    <Button
                                        customStyles={applyStyles([styles, customStyles], 'cancelBtn')}
                                        label={<AiOutlineClose size={20} />}
                                        onClick={cancelTimeSelection}
                                        />
                                    {
                                        hourSheet.map(hour => {

                                            if(isAMPM && hour >= 12){



                                            }

                                            const classList = [styles.timeNumber]

                                            // classList.push(moment(viewDate).set('month', month) > min && moment(viewDate).set('month', month) < max ? styles.dayOfCurMon : styles.dayOfOtherMon)

                                            if(
                                               hour >= min[0]
                                               && hour <= max[0]
                                            ){

                                               classList.push(styles.isSelectable)

                                            } else {

                                               classList.push(styles.isNotSelectable)

                                            }

                                            if(hour === selectedTime[0]){

                                               classList.push(styles.daySelected)

                                            }

                                            return (
                                                <div
                                                    key={'hour' + hour}
                                                    className={classList.join(' ')}
                                                    onClick={event => selectHour(event, hour)}
                                                    >
                                                    {hour}
                                                </div>
                                            )

                                        })
                                    }
                                </Grid>
                            </div>
                        </div>
                    )
                }
                {
                    currentOpenPicker === 'minute' && (
                        <div className={createStyle([styles, customStyles], 'timePicker')}>
                            <div
                                className={styles.timeGroup}
                                >
                                <Grid
                                    customStyles={applyStyles([styles, customStyles], 'minutesGrid')}
                                    >
                                    <Button
                                        customStyles={applyStyles([styles, customStyles], 'previousBtn')}
                                        label={<MdOutlineNavigateBefore size={20} />}
                                        onClick={goPrevious}
                                        />
                                    <Button
                                        customStyles={applyStyles([styles, customStyles], 'nextBtn')}
                                        label={<MdOutlineNavigateNext size={20} />}
                                        onClick={goNext}
                                        />
                                    <div
                                        className={styles.timeMinutesTitle}
                                        >
                                        Minutes
                                    </div>
                                    <Button
                                        customStyles={applyStyles([styles, customStyles], 'cancelBtn')}
                                        label={<AiOutlineClose size={20} />}
                                        onClick={cancelTimeSelection}
                                        />
                                    {
                                        minuteSheet.map(minutes => {

                                           const classList = [styles.timeNumber]

                                           // classList.push(moment(viewDate).set('month', month) > min && moment(viewDate).set('month', month) < max ? styles.dayOfCurMon : styles.dayOfOtherMon)

                                           if(
                                               isAMPM && (
                                                   true
                                               )
                                               || !isAMPM && (
                                                   (
                                                       (selectedTime[0] === min[0] && minutes >= min[1])
                                                       || selectedTime[0] > min[0]
                                                   )
                                                   && (
                                                       (selectedTime[0] === max[0] && minutes <= max[1])
                                                       || selectedTime[0] < max[0]
                                                   )
                                               )
                                           ){

                                               classList.push(styles.isSelectable)

                                           } else {

                                               classList.push(styles.isNotSelectable)

                                           }

                                           if(minutes === selectedTime[1]){

                                               classList.push(styles.daySelected)

                                           }

                                            return (
                                                <div
                                                    key={'minute' + minutes}
                                                    className={classList.join(' ')}
                                                    onClick={event => selectMinutes(event, minutes)}
                                                    >
                                                    {minutes}
                                                </div>
                                            )

                                        })
                                    }
                                </Grid>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )

}
