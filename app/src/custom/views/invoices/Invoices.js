import { useContext, useState, useEffect } from 'react'

import moment from 'moment'
import { toObject as stringtimeToObject } from 'stringtime'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { getEnrolledShifts, getShifts } from '../../services/ShiftService'
import { getAcceptedTimesheets } from '../../services/TimesheetService'
import { getInvoices, createInvoice } from '../../services/InvoiceService'

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

    const openHoursColumns = [
        {
            Header: hasRole('business') && applyTranslation('FREELANCER') || hasRole('freelancer') && applyTranslation('BUSINESS'),
            accessor: data => data.businessName,
        },
        {
            Header: applyTranslation('HOURS'),
            accessor: data => data.hours,
        },
        {
            Header: applyTranslation('CREATE INVOICE'),
            accessor: data => <div className={styles.createInvoiceBtn} onClick={event => createNewInvoice(data)}><AiOutlineFileAdd size={20} /></div>,
        },
    ]

    const invoicesColumns = [
        {
            Header: applyTranslation('DATE'),
            accessor: data => moment(data.billingDate).format('DD-MM-YYYY'),
        },
        {
            Header: hasRole('business') && applyTranslation('FREELANCER') || hasRole('freelancer') && applyTranslation('BUSINESS'),
            accessor: data => data.business.name,
        },
        {
            Header: applyTranslation('HOURS'),
            accessor: data => data.hours,
        },
        {
            Header: applyTranslation('AMOUNT'),
            accessor: data => data.amount,
        },
        {
            Header: applyTranslation('VIEW'),
            accessor: data => <div className={styles.createInvoiceBtn} onClick={event => console.log(event, data)}><AiOutlineFileSearch size={20} /></div>,
        },
    ]

    useEffect(() => {

        fetchAcceptedTimesheets()
        fetchInvoices()

    }, [])

    async function createNewInvoice(data){

        try {

            const response = await createInvoice(data)

            console.log(response.data)

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

                const hours = new Date(timesheet.actualByBusiness.end).getTime() - new Date(timesheet.actualByBusiness.start).getTime()

                if(!groupedInObject[timesheet.business._id]) groupedInObject[timesheet.business._id] = {
                    businessName:timesheet.business.name,
                    hours:0,
                    timesheets:[]
                }

                groupedInObject[timesheet.business._id || timesheet.freelancer._id].hours += Math.floor(hours / 1000 / 60 / 60)
                groupedInObject[timesheet.business._id || timesheet.freelancer._id].timesheets.push(timesheet._id)

            }

            const groupedInArray = []

            for(let business in groupedInObject){

                groupedInObject[business].business = business

                groupedInArray.push(groupedInObject[business])

            }

            setGroupedTimesheets(groupedInArray)

        } catch (error) {

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
            items={Menu({ userData, hasRole, applyTranslation, createTranslation })}
            title={applyTranslation('INVOICES')}
            logo={<Logo />}
            controls={<Controls />}
            >
            {
                viewmode === 'overview' && (
                    <>
                        <Card
                            customStyles={applyStyles([styles], 'tableCard')}
                            >
                            <div
                                className={styles.cardTitle}
                                >
                                {hasRole('business') ? 'OPEN HOURS' : 'BILLABLE HOURS'}
                            </div>
                            <Table
                                columns={openHoursColumns}
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
                                INVOICES
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
