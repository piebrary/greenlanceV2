import { useContext, useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { SettingsSchema } from '../../../default/schemas/Settings'

import Form from '../../../default/components/form/Form'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Label from '../../../default/components/label/Label'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import Select from '../../../default/components/formElements/select/Select'
import Controls from '../../../default/components/controls/Controls'

import { menuitems } from '../../../custom/assets/js/menu/items'
import { languageOptions } from '../../../default/assets/js/settings/language'

import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'
import { notificationManager } from '../../../default/utils/notifications'

import styles from './Settings.module.css'

export default function Settings(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, isAdmin, saveUserData } = useContext(UserContext)

    const notifications = notificationManager()

    async function onSubmit(data){

        data._id = userData._id

        const result = await saveUserData(data)

        if(result){

            notifications.create({
                title: "Successfully updated settings",
                type: 'success'
            })

        }

        if(!result){

            notifications.create({
                title: "Could not update settings",
                type: "danger",
            })

        }


    }

    const defaultValues = {
        username:userData.username,
        email:userData.email,
        'settings.language':userData.settings.language
    }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('SETTINGS')}
            controls={<Controls />}
            >
            <Card
                customStyles={applyStyles([styles], 'card1')}>
                <Form
                    onSubmit={onSubmit}
                    customStyles={applyStyles([styles], 'testform')}
                    defaultValues={defaultValues}
                    validationSchema={SettingsSchema}
                    >
                    <Label>
                        {applyTranslation('CREDENTIALS')}
                    </Label>
                    <Input
                        label={applyTranslation('USERNAME')}
                        name={'username'}
                        type={'text'}
                        shouldRegister
                        readOnly
                        />
                    <Input
                        label={applyTranslation('EMAIL')}
                        name={'email'}
                        type={'text'}
                        shouldRegister
                        />
                    <Input
                        label={applyTranslation('NEW_PASSWORD')}
                        name={'newPassword'}
                        type={'password'}
                        passwordToggle
                        shouldRegister
                        />
                    <Input
                        label={applyTranslation('REPEAT_PASSWORD')}
                        name={'newPasswordRepeat'}
                        type={'password'}
                        passwordToggle
                        shouldRegister
                        />
                    <Input
                        label={applyTranslation('CURRENT_PASSWORD')}
                        name={'currentPassword'}
                        type={'password'}
                        passwordToggle
                        shouldRegister
                        />
                    <Label>
                        {applyTranslation('REGIONAL_SETTINGS')}
                    </Label>
                    <Select
                        name={'settings.language'}
                        label={applyTranslation('LANGUAGE')}
                        options={languageOptions}
                        shouldRegister
                        />
                </Form>
            </Card>
        </Layout>
    )
}
