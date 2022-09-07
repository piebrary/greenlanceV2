import { useContext, useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Form from '../../../default/components/form/Form'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Grid from '../../../default/components/grid/Grid'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import ButtonGroup from '../../../default/components/buttonGroup/ButtonGroup'
import ImageUploader from '../../../default/components/imageUploader/ImageUploader'
import Table from '../../../default/components/table/Table'
import Select from '../../../default/components/formElements/select/Select'
import Checkbox from '../../../default/components/formElements/checkbox/Checkbox'

import { BsPersonCircle } from 'react-icons/bs'
import { BsCheck } from 'react-icons/bs'
import { BiUserPlus } from 'react-icons/bi'

import { menuitems } from '../../../default/assets/js/menu/items'
import { rolesOptions } from '../../../default/assets/js/user/roles'

import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'

import styles from './Documentation.module.css'

export default function Documentation(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, isAdmin } = useContext(UserContext)

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('DOCUMENTATION')}>
            <Card customStyles={applyStyles([styles], 'container')}>
                Here comes a list element
            </Card>
        </Layout>
    )
}
