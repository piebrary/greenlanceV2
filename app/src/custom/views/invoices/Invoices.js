import { useContext, useState, useEffect } from 'react'

import moment from 'moment'
import { toObject as stringtimeToObject } from 'stringtime'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { getEnrolledShifts, getShifts } from '../../services/ShiftService'
import { getAcceptedTimesheets } from '../../services/TimesheetService'
import { getInvoices, createInvoice, getInvoicePdf } from '../../services/InvoiceService'

import Button from '../../../default/components/button/Button'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Controls from '../../../default/components/controls/Controls'
import Input from '../../../default/components/formElements/input/Input'
import Logo from '../../../custom/components/logo/Logo'
import Menu from '../../../custom/components/menu/Menu'
import Table from '../../../default/components/table/Table'

import { applyStyles } from '../../../default/utils/applyStyles'
import { createStyle } from '../../../default/utils/createStyle'
import { notificationManager } from '../../../default/utils/notifications'

import { AiOutlineFileAdd } from 'react-icons/ai'
import { AiOutlineFileSearch } from 'react-icons/ai'

import styles from './Invoices.module.css'

export default function Invoices(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    const [timesheets, setTimesheets] = useState([])
    const [invoices, setInvoices] = useState([])
    const [groupedTimesheets, setGroupedTimesheets] = useState([])
    const [viewmode, setViewmode] = useState('overview')

    const notifications = notificationManager()

    createTranslation('Invoices.OPEN_HOURS', {
        en:'Open hours',
        nl:'Openstaande uren'
    })

    createTranslation('Invoices.INVOICES', {
        en:'Invoices',
        nl:'Facturen'
    })

    createTranslation('Invoices.FREELANCER', {
        en:'Freelancer',
        nl:'Zzp\'er'
    })

    createTranslation('Invoices.HOURS', {
        en:'Hours',
        nl:'Uren'
    })

    createTranslation('Invoices.NAME', {
        en:'Name',
        nl:'Naam'
    })

    createTranslation('Invoices.DATE', {
        en:'Date',
        nl:'Datum'
    })

    createTranslation('Invoices.AMOUNT', {
        en:'Amount',
        nl:'Aantal'
    })

    createTranslation('Invoices.VIEW', {
        en:'View',
        nl:'Bekijken'
    })

    const openHoursColumns = [
        {
            Header: applyTranslation('Invoices.FREELANCER'),
            accessor: data => data.name
        },
        {
            Header: applyTranslation('Invoices.HOURS'),
            accessor: data => data.hours,
        },
    ]

    const billableHoursColumns = [
        {
            Header: applyTranslation('Invoices.BUSINESS'),
            accessor: data => data.name
        },
        {
            Header: applyTranslation('Invoices.HOURS'),
            accessor: data => data.hours,
        },
        {
            Header: applyTranslation('Invoices.CREATE_INVOICE'),
            accessor: data => <div className={styles.createInvoiceBtn} onClick={event => createNewInvoice(data.timesheets)}><AiOutlineFileAdd size={20} /></div>,
        },
    ]

    const invoicesColumns = [
        {
            Header: applyTranslation('Invoices.NAME'),
            accessor: data => data.name,
        },
        {
            Header: applyTranslation('Invoices.DATE'),
            accessor: data => moment(data.billingDate).format('DD-MM-YYYY'),
        },
        {
            Header: hasRole('client') && applyTranslation('Invoices.FREELANCER') || hasRole('freelancer') && applyTranslation('Invoices.BUSINESS'),
            accessor: data => hasRole('client') && data.freelancer.name || hasRole('freelancer') && data.client.name,
        },
        {
            Header: applyTranslation('Invoices.HOURS'),
            accessor: data => data.hours,
        },
        {
            Header: applyTranslation('Invoices.AMOUNT'),
            accessor: data => data.amount,
        },
        {
            Header: applyTranslation('Invoices.VIEW'),
            accessor: data => (
                <div
                    className={styles.createInvoiceBtn}
                    onClick={event => viewPdf(event, data)}>
                    <AiOutlineFileSearch size={20} />
                </div>
            ),
        },
    ]

    useEffect(() => {

        fetchAcceptedTimesheets()
        fetchInvoices()

    }, [])

    async function viewPdf(event, data){

        const result = await getInvoicePdf(data.name)
        console.log(result)
        result.data.blob().then(blob => {
            console.log(blob)
        })

    }

    async function createNewInvoice(data){

        try {

            const response = await createInvoice(data)

            fetchAcceptedTimesheets()
            fetchInvoices()

        } catch (error) {

            notifications.create({
                title: "Could not create new invoice",
                type: 'danger',
                container:'bottom-right'
            })

        }

    }

    async function fetchAcceptedTimesheets(){

        try {

            const response = await getAcceptedTimesheets()

            const groupedInObject = {}

            for(let timesheet of response.data){

                const hours = new Date(timesheet.actual.client.end).getTime() - new Date(timesheet.actual.client.start).getTime()
                const oppositeParty = timesheet.client || timesheet.freelancer

                if(groupedInObject[oppositeParty._id]){

                    groupedInObject[oppositeParty._id].hours += Math.floor(hours * 1000 * 60 * 60)
                    groupedInObject[oppositeParty._id].timesheets.push(timesheet._id)

                }

                if(!groupedInObject[oppositeParty._id]){

                    groupedInObject[oppositeParty._id] = {
                        name:oppositeParty.name,
                        hours:hours,
                        timesheets:[timesheet._id]
                    }

                }

            }

            const groupedInArray = []

            for(let entity in groupedInObject){

                groupedInArray.push(groupedInObject[entity])

            }

            setGroupedTimesheets(groupedInArray)

        } catch (error) {

            console.log(error)

            notifications.create({
                title: "Could not load timesheets",
                type: 'danger',
                container:'bottom-right'
            })

        }

    }

    async function fetchInvoices(){

        try {

            const response = await getInvoices()

            setInvoices(response.data)

        } catch (error) {

            notifications.create({
                title: "Could not fetch invoices",
                type: 'danger',
                container:'bottom-right'
            })

        }

    }

    return (
        <Layout
            className={styles.container}
            items={Menu()}
            title={applyTranslation('Menu.INVOICES')}
            logo={<Logo />}
            controls={<Controls />}
            >
            {
                viewmode === 'overview' && hasRole('client') && (
                    <>
                        <Card
                            customStyles={applyStyles([styles], 'tableCard')}
                            >
                            <div
                                className={styles.cardTitle}
                                >
                                {applyTranslation('Invoices.OPEN_HOURS')}
                            </div>
                            <Table
                                columns={openHoursColumns}
                                data={groupedTimesheets}
                                customStyles={applyStyles([styles], 'tableCellContent')}
                                noRecordsMessage={'There are no open hours. Timesheets of shifts must first be accepted by both parties.'}
                                />
                        </Card>
                        <Card
                            customStyles={applyStyles([styles], 'tableCard')}
                            >
                            <div
                                className={styles.cardTitle}
                                >
                                {applyTranslation('Invoices.INVOICES')}
                            </div>
                            <Table
                                columns={invoicesColumns}
                                data={invoices}
                                customStyles={applyStyles([styles], 'tableCellContent')}
                                noRecordsMessage={'There are no invoices yet'}
                                />
                        </Card>
                    </>
                )
            }
            {
                viewmode === 'overview' && hasRole('freelancer') && (
                    <>
                        <Card
                            customStyles={applyStyles([styles], 'tableCard')}
                            >
                            <div
                                className={styles.cardTitle}
                                >
                                {applyTranslation('Invoices.BILLABLE_HOURS')}
                            </div>
                            <Table
                                columns={billableHoursColumns}
                                data={groupedTimesheets}
                                customStyles={applyStyles([styles], 'tableCellContent')}
                                noRecordsMessage={'There are no billable hours. Timesheets of shifts must first be accepted by both parties.'}
                                />
                        </Card>
                        <Card
                            customStyles={applyStyles([styles], 'tableCard')}
                            >
                            <div
                                className={styles.cardTitle}
                                >
                                {applyTranslation('Invoices.INVOICES')}
                            </div>
                            <Table
                                columns={invoicesColumns}
                                data={invoices}
                                customStyles={applyStyles([styles], 'tableCellContent')}
                                noRecordsMessage={'There are no invoices yet'}
                                />
                        </Card>
                    </>
                )
            }
            {
                viewmode === 'invoice' && (
                    <>

                    </>
                )
            }
        </Layout>
    )
}
