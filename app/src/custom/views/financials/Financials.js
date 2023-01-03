import { useContext, useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'
import { RolesContext } from '../../../default/contexts/RolesContext'
import { VisualsContext } from '../../../default/contexts/VisualsContext'

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
import Menu from '../../../custom/components/menu/Menu'

import { BiUserPlus } from 'react-icons/bi'
import { FiCheckCircle } from 'react-icons/fi'

import { applyStyles } from '../../../default/utils/applyStyles'
import { createStyle } from '../../../default/utils/createStyle'
import { containsNumber } from '../../../default/utils/containsNumber'
import { notificationManager } from '../../../default/utils/notifications'

import styles from './Financials.module.css'

export default function Financials(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole, saveUserData, getUsers, postUser, delUser } = useContext(UserContext)
    const { getAvailableRoles } = useContext(RolesContext)

    return (
        <Layout
            items={Menu()}
            title={applyTranslation('Menu.FINANCIALS')}
            controls={<Controls />}
            >
        </Layout>
    )
}
