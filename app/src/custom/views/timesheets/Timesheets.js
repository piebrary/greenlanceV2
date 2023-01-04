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

            if(hasRole('client')){

                // get all shifts from client
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

    createTranslation('TimesheetView.INTRO', {
        en:(
            <p>
                Here you can fill in the time {hasRole('freelancer') && 'you have actually worked' || hasRole('client') && 'the freelancer has worked'}. If the worked times don't match, you can choose to accept the time the {hasRole('freelancer') && 'client' || hasRole('client') && 'freelancer'} entered or contact the {hasRole('freelancer') && 'client' || hasRole('client') && 'freelancer'}. When the times match hours can be billed on the Invoices page and will disappear from this page.
            </p>
        ),
        nl:`Hier kun je de tijd invullen die ${hasRole('freelancer') && 'je hebt gewerkt' || hasRole('client') && 'de freelancer heeft gewerkt'}. Mochten de opgegeven tijden verschillen dan kun je ervoor kiezen de tijd die opgegeven is door de ${hasRole('freelancer') && 'opdrachtgever' || hasRole('client') && 'freelancer'} te accepteren of contact op te nemen met de ${hasRole('freelancer') && 'opdrachtgever' || hasRole('client') && 'freelancer'}. Wanneer de tijden kloppen kun je de uren factureren via de Facturen pagina en zullen ze verdwijnen van deze pagina.`
    })

    createTranslation('TimesheetView.AT', {
        en:'at',
        nl:'op'
    })

    createTranslation('TimesheetView.BY', {
        en:'by',
        nl:'door'
    })

    createTranslation('TimesheetView.STATUS', {
        en:'status',
        nl:'status'
    })

    createTranslation('TimesheetView.PLANNED', {
        en:'Planned',
        nl:'Gepland'
    })

    createTranslation('TimesheetView.ACTUAL_BY_FREELANCER', {
        en:'Actual (freelancer)',
        nl:'Daadwerkelijk (freelancer)'
    })

    createTranslation('TimesheetView.ACTUAL_BY_CLIENT', {
        en:'Actual (client)',
        nl:'Daadwerkelijk (client)'
    })

    createTranslation('TimesheetView.NO_FREELANCER_TIMESHEETS_FOUND', {
        en:'No timesheets found. Work a shift first and a timesheet will pop up.',
        nl:'Er zijn geen urenstaten gevonden. Werk een dienst en de betreffende urenstaat verschijnt hier.'
    })

    createTranslation('TimesheetView.NO_CLIENT_TIMESHEETS_FOUND', {
        en:'No timesheets found. Freelancers will need to work a shift first and their timesheets will pop up here.',
        nl:'Er zijn geen urenstaten gevonden. Een freelancer moet een dienst werken en de betreffende urenstaat verschijnt hier.'
    })

    return (
        <Layout
            className={styles.container}
            items={Menu()}
            title={applyTranslation('Menu.TIMESHEETS')}
            logo={<Logo />}
            controls={<Controls />}
            customStyles={applyStyles([styles], ['Layout'])}
            >
            <Card customStyles={applyStyles([styles], ['cardIntro'])}>
                {applyTranslation('TimesheetView.INTRO')}
            </Card>
            {
                shifts.filter(shift => shift.timesheets.length > 0).length === 0 && hasRole('freelancer') && (
                    <Card customStyles={applyStyles([styles], ['cardIntro'])}>
                        {applyTranslation('TimesheetView.NO_FREELANCER_TIMESHEETS_FOUND')}
                    </Card>
                )
            }
            {
                shifts.filter(shift => shift.timesheets.length > 0).length === 0 && hasRole('client') && (
                    <Card customStyles={applyStyles([styles], ['cardIntro'])}>
                        {applyTranslation('TimesheetView.NO_CLIENT_TIMESHEETS_FOUND')}
                    </Card>
                )
            }
            {
                shifts.map(shift => {

                    const key = shift._id

                    return shift.timesheets.length > 0 && (
                        <div
                            className={styles.timesheetsContainer}
                            key={key}
                            >
                            {
                                shift.timesheets.map((timesheet, index) => {

                                    const key = timesheet._id

                                    return (
                                        <Card
                                            key={key}
                                            className={styles.timesheetCard}
                                            title={`${shift.name} ${applyTranslation('TimesheetView.AT')} ${shift.datetime.start} ${applyTranslation('TimesheetView.BY')} ${shift.client?.name || timesheet.freelancer?.name}`}
                                            description={`${applyTranslation('TimesheetView.STATUS')}: ` + timesheet.status}
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
                                                            && timesheet.actualByClient?.end
                                                        )
                                                        && (
                                                            timesheet.actualByFreelancer?.start !== timesheet.actualByClient?.start
                                                            || timesheet.actualByFreelancer?.end !== timesheet.actualByClient?.end
                                                        )
                                                    )
                                                    && (
                                                        <Button
                                                            label={applyTranslation('TimesheetView.OPEN_DISPUTE')}
                                                            onClick={() => dispute(timesheet._id)}
                                                            />
                                                    )
                                                }
                                                <div className={styles.timesheetGroup}>
                                                    <div className={styles.timesheetTitle}>{applyTranslation('TimesheetView.PLANNED')}</div>
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
                                                        {applyTranslation('TimesheetView.ACTUAL_BY_FREELANCER')}
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
                                                        {applyTranslation('TimesheetView.ACTUAL_BY_CLIENT')}
                                                    </div>
                                                    <div className={styles.timesheetValue}>
                                                        <Input
                                                            name={`timesheet[${index}].actualByClient.start`}
                                                            type={'datetime-local'}
                                                            customStyles={applyStyles([styles], ['timesheetInput'])}
                                                            defaultValue={timesheet.actualByClient?.start}
                                                            onBlur={data => updateTimesheet(timesheet._id, { start:data.target.value })}
                                                            readOnly={!hasRole('client') || timesheet.actualByClient?.start}
                                                            />
                                                    </div>
                                                    <div className={styles.timesheetValue}>
                                                        <Input
                                                            name={`timesheet[${index}].actualByClient.end`}
                                                            type={'datetime-local'}
                                                            customStyles={applyStyles([styles], ['timesheetInput'])}
                                                            defaultValue={timesheet.actualByClient?.end}
                                                            onBlur={data => updateTimesheet(timesheet._id, { end:data.target.value })}
                                                            readOnly={!hasRole('client') || timesheet.actualByClient?.end}
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
