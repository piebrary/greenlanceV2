import { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'
import { RolesContext } from '../../../default/contexts/RolesContext'
import { VisualsContext } from '../../../default/contexts/VisualsContext'

import { createBusiness, connectToBusiness } from '../../services/BusinessService'

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
import Radio from '../../../default/components/formElements/radio/Radio'
import Label from '../../../default/components/label/Label'
import Controls from '../../../default/components/controls/Controls'
import Menu from '../../../custom/components/menu/Menu'

import { BiUserPlus } from 'react-icons/bi'
import { FiCheckCircle } from 'react-icons/fi'

import { applyStyles } from '../../../default/utils/applyStyles'
import { createStyle } from '../../../default/utils/createStyle'
import { containsNumber } from '../../../default/utils/containsNumber'
import { notificationManager } from '../../../default/utils/notifications'

import styles from './RegisterBusiness.module.css'

export default function RegisterBusiness(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole, saveUserData, getUsers, postUser, delUser, refreshUser } = useContext(UserContext)
    const { getAvailableRoles } = useContext(RolesContext)

    async function onCreateBusiness(data){

        await createBusiness(data)

        refreshUser()

    }

    async function onConnectToBusiness(data){

        await connectToBusiness(data)

        refreshUser()

    }

    const defaultValues = {}

    return (
        <>
            <Card>
                <NavLink to={'/logout'}>
                    Logout
                </NavLink>
            </Card>
            <Card
                title={'Create a new business'}
                >
                <Form
                    onSubmit={onCreateBusiness}
                    customStyles={applyStyles([styles], 'testform')}
                    defaultValues={defaultValues}
                    >
                    <Radio
                        label={'Do you want to register as a Freelancer or as a Client?'}
                        name={'type'}
                        shouldRegister
                        required
                        options={[
                            {
                                name:'freelancer',
                                label:'Freelancer',
                                checked:false,
                            },{
                                name:'client',
                                label:'Client',
                                checked:false,
                            },
                        ]}
                        />
                    <Input
                        label={'Business name'}
                        name={'name'}
                        shouldRegister
                        required
                        />
                </Form>
            </Card>
            <Card
                title={'Connect to an existing business'}
                >
                <Form
                    onSubmit={onConnectToBusiness}
                    customStyles={applyStyles([styles], 'testform')}
                    defaultValues={defaultValues}
                    >
                    <Input
                        label={'Business name'}
                        name={'name'}
                        shouldRegister
                        required
                        />
                </Form>
            </Card>
        </>
    )
}
