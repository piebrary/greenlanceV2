import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { getEnrolledShifts } from '../../services/ShiftService'
import { getShifts } from '../../services/ShiftService'

import Button from '../../../default/components/button/Button'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Controls from '../../../default/components/controls/Controls'
import Table from '../../../default/components/table/Table'
import Input from '../../../default/components/formElements/input/Input'

import Logo from '../../../custom/components/logo/Logo'

import { menuitems } from '../../../custom/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'
import { createStyle } from '../../../default/utils/createStyle'
import { notificationManager } from '../../../default/utils/notifications'

import { GiConfirmed } from 'react-icons/gi'

import styles from './Timesheets.module.css'

export default function Timesheets(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    const [shifts, setShifts] = useState([])
    const [timesheets, setTimesheets] = useState([])

    const notifications = notificationManager()


    const columns = [
        {
            Header: hasRole('business') && applyTranslation('FREELANCER') || hasRole('freelancer') && applyTranslation('BUSINESS'),
            accessor: data => data.business.name,
        },
        {
            Header: applyTranslation('PROJECT'),
            accessor: data => data.project,
            isVisible: hasRole('business') || false,
        },
        {
            Header: applyTranslation('START'),
            accessor: data => (
                <Input
                    name={'datetime' + 'start' + data._id}
                    type={'datetime-local'}
                    customStyles={applyStyles([styles], ['timesheetInput'])}
                    defaultValue={
                        data.timesheets?.[0]?.freelancer.start
                        || data.timesheets?.[0]?.business.start
                        || data.timesheets?.[0]?.planned.start
                        || data.datetime.start
                    }
                    shouldRegister
                    />
            ),
        },
        {
            Header: applyTranslation('END'),
            accessor: data => (
                <Input
                    name={'datetime' + 'end' + data._id}
                    type={'datetime-local'}
                    customStyles={applyStyles([styles], ['timesheetInput'])}
                    defaultValue={
                        data.timesheets?.[0]?.freelancer.end
                        || data.timesheets?.[0]?.business.end
                        || data.timesheets?.[0]?.planned.end
                        || data.datetime.end
                    }
                    shouldRegister
                    />
            ),
        },
        {
            Header: applyTranslation('CONFIRM'),
            accessor: data => <GiConfirmed size={30} onClick={event => console.log(data)} />,
        },
    ]

    useEffect(() => {

        fetchTimesheets()

    }, [])

    async function fetchTimesheets(){

        try {

            if(hasRole('freelancer')){

                const response = await getEnrolledShifts()

                setTimesheets(response.data)

            }

            if(hasRole('business')){

                // get all shifts from business
                const response = await getShifts()

                setShifts(response.data)

            }

        } catch (error) {

            notifications.create({
                title: "Could not load shifts",
                type: 'danger',
                container:'bottom-right'
            })

        }

    }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, hasRole, applyTranslation, createTranslation })}
            title={applyTranslation('TIMESHEETS')}
            logo={<Logo />}
            controls={<Controls />}
            >
            {
                hasRole('freelancer') && (
                    <Card>
                        Checkin or checkout here
                    </Card>
                )
            }
            <Card
                customStyles={applyStyles([styles], 'tableCard')}
                >
                <div
                    className={styles.tableCardControls}
                    >
                    <div>Viewing past 30 days</div>
                    <Button label={'View full history'} />
                </div>
                <Table
                    columns={columns}
                    data={timesheets}
                    customStyles={applyStyles([styles], ['timesheetTable'])}
                    />
            </Card>
        </Layout>
    )
}
