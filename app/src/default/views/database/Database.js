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

import Menu from '../../../default/components/menu/Menu'

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
        ]
    }

    useEffect(() => {

        fetchDbData()

    }, [])

    async function fetchDbData(){

        const response = await getDbCollections()

        setData(response.data)

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
            <Card
                title={'EVENTS'}>
                <Table
                    columns={columns.events}
                    data={data.events}
                    />
            </Card>
            <Card
                title={'MUTATIONS'}>
            <Table
                columns={columns.mutations}
                data={data.mutations}
                />
            </Card>
            <Card
                title={'USERS'}>
            <Table
                columns={columns.users}
                data={data.users}
                />
            </Card>
        </Layout>
    )
}
