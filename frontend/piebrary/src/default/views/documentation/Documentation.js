import { useContext, useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Form from '../../components/form/Form'
import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Grid from '../../components/grid/Grid'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'
import ImageUploader from '../../components/imageUploader/ImageUploader'
import Table from '../../components/table/Table'
import Select from '../../components/select/Select'
import Checkbox from '../../components/checkbox/Checkbox'

import { BsPersonCircle } from 'react-icons/bs'
import { BsCheck } from 'react-icons/bs'
import { BiUserPlus } from 'react-icons/bi'

import { menuitems } from '../../assets/js/menu/items'
import { rolesOptions } from '../../assets/js/user/roles'

import { filterStyles } from '../../utils/filterStyles'
import { containsNumber } from '../../utils/containsNumber'

import styles from './Documentation.module.css'

export default function Documentation(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    return (
        <Layout
            items={menuitems({ isAdmin, translate })}
            title={translate('DOCUMENTATION')}>
            <Card customStyles={filterStyles([styles], 'container')}>
                Here comes a list element
            </Card>
        </Layout>
    )
}
