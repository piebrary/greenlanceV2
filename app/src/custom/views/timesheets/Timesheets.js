import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { getEnrolledShifts, getShifts } from '../../services/ShiftService'
import { acceptTimesheet, disputeTimesheet, updateTimesheetActual } from '../../services/TimesheetService'

import Button from '../../../default/components/button/Button'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Controls from '../../../default/components/controls/Controls'
import Input from '../../../default/components/formElements/input/Input'
import Logo from '../../../custom/components/logo/Logo'
import Menu from '../../../custom/components/menu/Menu'

import { applyStyles } from '../../../default/utils/applyStyles'
import { createStyle } from '../../../default/utils/createStyle'
import { notificationManager } from '../../../default/utils/notifications'

import { GiConfirmed } from 'react-icons/gi'

import styles from './Timesheets.module.css'

export default function Timesheets(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    const [shifts, setShifts] = useState([])

    const notifications = notificationManager()

    useEffect(() => {

        fetchShifts()

    }, [])

    async function fetchShifts(){

        try {

            if(hasRole('freelancer')){

                const response = await getEnrolledShifts()

                setShifts(
                    response.data
                        .sort((a, b) => new Date(a.datetime.start).getTime() - new Date(b.datetime.start).getTime())
                )

            }

            if(hasRole('business')){

                // get all shifts from business
                const response = await getShifts()

                setShifts(
                    response.data
                        .sort((a, b) => new Date(a.datetime.start).getTime() - new Date(b.datetime.start).getTime())
                )

            }

        } catch (error) {

            notifications.create({
                title: "Could not load shifts",
                type: 'danger',
                container:'bottom-right'
            })

        }

    }

    async function updateTimesheet(_id, value){

        try {

            const response = await updateTimesheetActual(_id, value)

            setShifts(previous => {

                const newShifts = previous.map(shift => {

                    const timesheets = shift.timesheets.map(timesheet => {

                        if(timesheet._id === _id) return response.data
                        return timesheet

                    })

                    shift.timesheets = timesheets

                    return shift

                })

                return newShifts
                    .sort((a, b) => new Date(a.datetime.start).getTime() - new Date(b.datetime.start).getTime())

            })

        } catch (error) {

            notifications.create({
                title: "Could not update timesheet",
                type: 'danger',
                container:'bottom-right'
            })

        }

    }

    async function dispute(_id, value){

        try {

            const response = await disputeTimesheet(_id)

            setShifts(previous => {

                const newShifts = previous.map(shift => {

                    const timesheets = shift.timesheets.map(timesheet => {

                        if(timesheet._id === _id) return response.data
                        return timesheet

                    })

                    shift.timesheets = timesheets

                    return shift

                })

                return newShifts
                    .sort((a, b) => new Date(a.datetime.start).getTime() - new Date(b.datetime.start).getTime())

            })

        } catch (error) {

            notifications.create({
                title: "Could not dispute timesheet",
                type: 'danger',
                container:'bottom-right'
            })

        }

    }

    return (
        <Layout
            className={styles.container}
            items={Menu({ userData, hasRole, applyTranslation, createTranslation })}
            title={applyTranslation('TIMESHEETS')}
            logo={<Logo />}
            controls={<Controls />}
            >
            {
                shifts.map(shift => {

                    const key = shift._id

                    return (
                        <div
                            className={styles.timesheetsContainer}
                            key={key}
                            >
                            {
                                shift.timesheets.map((timesheet, index) => {

                                    const key = timesheet._id

                                    console.log(timesheet)

                                    return (
                                        <Card
                                            key={key}
                                            className={styles.timesheetCard}
                                            title={shift.business?.name || timesheet.freelancer?.name}
                                            description={'Status: ' + timesheet.status}
                                            >
                                            <div
                                                className={styles.timesheetCardContent}
                                                >
                                                {
                                                    timesheet.status === 'open'
                                                    && (
                                                        (
                                                            timesheet.actualByFreelancer?.start
                                                            && timesheet.actualByFreelancer?.end
                                                            && timesheet.actualByFreelancer?.start
                                                            && timesheet.actualByBusiness?.end
                                                        )
                                                        && (
                                                            timesheet.actualByFreelancer?.start !== timesheet.actualByBusiness?.start
                                                            || timesheet.actualByFreelancer?.end !== timesheet.actualByBusiness?.end
                                                        )
                                                    )
                                                    && (
                                                        <Button
                                                            label={'Open dispute'}
                                                            onClick={() => dispute(timesheet._id)}
                                                            />
                                                    )
                                                }
                                                <div className={styles.timesheetGroup}>
                                                    <div className={styles.timesheetTitle}>Planned</div>
                                                    <div className={styles.timesheetValue}>
                                                        <Input
                                                            name={`shift.timesheets[${index}].planned.start`}
                                                            type={'datetime-local'}
                                                            customStyles={applyStyles([styles], ['timesheetInput'])}
                                                            defaultValue={timesheet.planned?.start}
                                                            readOnly
                                                            />
                                                    </div>
                                                    <div className={styles.timesheetValue}>
                                                        <Input
                                                            name={`shift.timesheets[${index}].planned.end`}
                                                            type={'datetime-local'}
                                                            customStyles={applyStyles([styles], ['timesheetInput'])}
                                                            defaultValue={timesheet.planned?.end}
                                                            readOnly
                                                            />
                                                    </div>
                                                </div>
                                                <div className={styles.timesheetGroup}>
                                                    <div className={styles.timesheetTitle}>
                                                        Actual By Freelancer
                                                    </div>
                                                    <div className={styles.timesheetValue}>
                                                        <Input
                                                            name={`timesheet[${index}].actualByFreelancer.start`}
                                                            type={'datetime-local'}
                                                            customStyles={applyStyles([styles], ['timesheetInput'])}
                                                            defaultValue={timesheet.actualByFreelancer?.start}
                                                            onBlur={data => updateTimesheet(timesheet._id, { start:data.target.value })}
                                                            readOnly={!hasRole('freelancer') || timesheet.actualByFreelancer?.start}
                                                            />
                                                    </div>
                                                    <div className={styles.timesheetValue}>
                                                        <Input
                                                            name={`timesheet[${index}].actualByFreelancer.end`}
                                                            type={'datetime-local'}
                                                            customStyles={applyStyles([styles], ['timesheetInput'])}
                                                            defaultValue={timesheet.actualByFreelancer?.end}
                                                            onBlur={data => updateTimesheet(timesheet._id, { end:data.target.value })}
                                                            readOnly={!hasRole('freelancer') || timesheet.actualByFreelancer?.end}
                                                            />
                                                    </div>
                                                </div>
                                                <div className={styles.timesheetGroup}>
                                                    <div className={styles.timesheetTitle}>
                                                        Actual By Business
                                                    </div>
                                                    <div className={styles.timesheetValue}>
                                                        <Input
                                                            name={`timesheet[${index}].actualByBusiness.start`}
                                                            type={'datetime-local'}
                                                            customStyles={applyStyles([styles], ['timesheetInput'])}
                                                            defaultValue={timesheet.actualByBusiness?.start}
                                                            onBlur={data => updateTimesheet(timesheet._id, { start:data.target.value })}
                                                            readOnly={!hasRole('business') || timesheet.actualByBusiness?.start}
                                                            />
                                                    </div>
                                                    <div className={styles.timesheetValue}>
                                                        <Input
                                                            name={`timesheet[${index}].actualByBusiness.end`}
                                                            type={'datetime-local'}
                                                            customStyles={applyStyles([styles], ['timesheetInput'])}
                                                            defaultValue={timesheet.actualByBusiness?.end}
                                                            onBlur={data => updateTimesheet(timesheet._id, { end:data.target.value })}
                                                            readOnly={!hasRole('business') || timesheet.actualByBusiness?.end}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                })
                            }
                        </div>
                    )

                })

            }
        </Layout>
    )
}
