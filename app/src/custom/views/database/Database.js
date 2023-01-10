import { useContext, useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../../default/contexts/LanguageContext'

import { getDbCollections } from '../../../default/services/DbService'

import Form from '../../../default/components/form/Form'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Input from '../../../default/components/formElements/input/Input'
import EmailInput from '../../../default/components/formElements/emailInput/EmailInput'
import PhoneInput from '../../../default/components/formElements/phoneInput/PhoneInput'
import AddressInput from '../../../default/components/formElements/addressInput/AddressInput'
import Button from '../../../default/components/button/Button'
import Table from '../../../default/components/table/Table'
import Checkbox from '../../../default/components/formElements/checkbox/Checkbox'
import Label from '../../../default/components/label/Label'
import Controls from '../../../default/components/controls/Controls'

import { BiUserPlus } from 'react-icons/bi'
import { FiCheckCircle } from 'react-icons/fi'

import Menu from '../../../custom/components/menu/Menu'

import { applyStyles } from '../../../default/utils/applyStyles'
import { createStyle } from '../../../default/utils/createStyle'
import { containsNumber } from '../../../default/utils/containsNumber'
import { notificationManager } from '../../../default/utils/notifications'

import styles from './Database.module.css'

export default function Database(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)

    const notifications = notificationManager()

    const [data, setData] = useState({
        events:[],
        mutations:[],
        users:[],
        shifts:[],
        clients:[],
        freelancers:[],
        invoices:[],
        projects:[],
        reviews:[],
        timesheets:[]
    })

    const columns = {
        events:[
            { Header: '_id', accessor: '_id' },
            { Header: 'name', accessor: 'name' },
        ],
        mutations:[
            { Header: '_id', accessor: '_id' },
            { Header: 'user', accessor: 'user' },
            { Header: 'action', accessor: 'action' },
            { Header: 'data', accessor: data => JSON.stringify(data.mutations) },
        ],
        users:[
            { Header: '_id', accessor: '_id' },
            { Header: 'username', accessor: 'username' },
            { Header: 'roles', accessor: data => data.roles.join(' ') },
        ],
        shifts:[
            { Header: '_id', accessor: '_id' },
            { Header: 'name', accessor: 'name' },
            { Header: 'client', accessor: 'client' },
            { Header: 'price', accessor: 'price' },
        ],
        clients:[
            { Header: 'name', accessor: 'name' },
            { Header: 'shifts', accessor: data => data.shifts.length },
            { Header: 'rating', accessor: 'rating' },
            { Header: 'reviews', accessor: data => data.reviews.length },
            { Header: 'connectedFreelancers', accessor: data => data.connectedFreelancers.length },
        ],
        freelancers:[
            { Header: 'name', accessor: 'name' },
            { Header: 'connections', accessor: data => data.connections.length },
            { Header: 'rating', accessor: 'rating' },
            { Header: 'reviews', accessor: data => data.reviews.length },
            { Header: 'applied', accessor: data => data.applied.length },
            { Header: 'enrolled', accessor: data => data.enrolled.length },
            { Header: 'withdrawn', accessor: data => data.withdrawn.length },
        ],
        invoices:[
            { Header: 'name', accessor: 'name' },
            { Header: 'client', accessor: 'client' },
            { Header: 'freelancer', accessor: 'freelancer' },
            { Header: 'isSend', accessor: 'isSend' },
            { Header: 'isPayed', accessor: 'isPayed' },
            { Header: 'hours', accessor: 'hours' },
            { Header: 'amount', accessor: 'amount' },
            { Header: 'billingDate', accessor: 'billingDate' },
        ],
        projects:[
            { Header: 'name', accessor: 'name' },
            { Header: 'client', accessor: 'client' },
            { Header: 'shifts', accessor: data => data.shifts.length },
            { Header: 'active', accessor: 'active' },
        ],
        reviews:[
            { Header: 'subject', accessor: 'subject' },
            { Header: 'reviewer', accessor: 'reviewer' },
            { Header: 'rating', accessor: 'rating' },
            { Header: 'comment', accessor: 'comment' },
        ],
        timesheets:[
            { Header: 'shift', accessor: 'shift' },
            { Header: 'freelancer', accessor: 'freelancer' },
            { Header: 'client', accessor: 'client' },
            { Header: 'status', accessor: 'status' },
        ]

    }

    useEffect(() => {

        fetchDbData()

    }, [])

    async function fetchDbData(){

        const response = await getDbCollections()

        for(let property in response.data){

            setData(previous => {

                const newData = {...previous}

                newData[property] = response.data[property]

                return newData

            })

        }

    }

    createTranslation('Database.DATABASE', {
        en:'Database',
        nl:'Database'
    })

    return (
        <Layout
            items={Menu()}
            title={applyTranslation('Database.DATABASE')}
            controls={<Controls />}
            >
            <Table
                columns={columns.events}
                data={data.events}
                title={'EVENTS'}
                />
            <Table
                columns={columns.mutations}
                data={data.mutations}
                title={'MUTATIONS'}
                />
            <Table
                columns={columns.users}
                data={data.users}
                title={'USERS'}
                />
            <Table
                columns={columns.shifts}
                data={data.shifts}
                title={'SHIFTS'}
                />
            <Table
                columns={columns.clients}
                data={data.clients}
                title={'CLIENTS'}
                />
            <Table
                columns={columns.freelancers}
                data={data.freelancers}
                title={'FREELANCERS'}
                />
            <Table
                columns={columns.invoices}
                data={data.invoices}
                title={'INVOICES'}
                />
            <Table
                columns={columns.projects}
                data={data.projects}
                title={'PROJECTS'}
                />
            <Table
                columns={columns.timesheets}
                data={data.timesheets}
                title={'TIMESHEETS'}
                />
        </Layout>
    )
}
