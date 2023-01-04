import { useContext, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Form from '../../../default/components/form/Form'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Select from '../../../default/components/formElements/select/Select'
import Radio from '../../../default/components/formElements/radio/Radio'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import ImageUploader from '../../../default/components/imageUploader/ImageUploader'
import Controls from '../../../default/components/controls/Controls'
import Menu from '../../../custom/components/menu/Menu'

import { BsPersonCircle } from 'react-icons/bs'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './BusinessProfile.module.css'

export default function BusinessProfile(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole, saveUserData, getProfilePicture } = useContext(UserContext)

    const onSubmit = data => saveUserData(data)

    const defaultValues = {}

    return (
        <Layout
            className={styles.container}
            items={Menu()}
            title={applyTranslation('Menu.BUSINESS_PROFILE')}
            controls={<Controls />}
            >
            <Card
                customStyles={applyStyles([styles], 'card1')}
                >
                <div className={styles.formContainer}>
                    You are a {hasRole('freelancer') && 'freelancer' || hasRole('client') && 'client'}!
                </div>
            </Card>
        </Layout>
    )
}
