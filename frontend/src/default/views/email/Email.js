import { useContext, useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import { sendEmail } from '../../services/EmailService'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'
import Form from '../../components/form/Form'
import Input from '../../components/formElements/input/Input'
import Textarea from '../../components/formElements/textarea/Textarea'

import { menuitems } from '../../assets/js/menu/items'
import { applyStyles } from '../../utils/applyStyles'
import { notificationManager } from '../../utils/notifications'

import styles from './Email.module.css'

export default function EmailView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, isAdmin } = useContext(UserContext)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const notifications = notificationManager()

    const onSubmit = (data) => {

        try {

            const result = sendEmail(data)

            notifications.create({
                title: 'Success',
                message:`Email send to ${data.to}`,
                type: 'success'
            })

        } catch (error) {

            notifications.create({
                title: 'Error',
                message:'Could not send email',
                type: 'danger'
            })

        }

    }

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('EMAIL')}>
            <Card>
            <Form
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name={'to'}
                    label={'To'}
                    subtype={'text'}
                    customStyles={applyStyles([styles], 'customInput')}
                    register={register}
                    errors={errors}
                    rules={{
                        required: 'To is required'
                    }}
                    />
                <Input
                    name={'from'}
                    label={'From'}
                    subtype={'text'}
                    customStyles={applyStyles([styles], 'customInput')}
                    register={register}
                    errors={errors}
                    rules={{
                        required: 'From is required'
                    }}
                    />
                <Input
                    name={'subject'}
                    label={'Subject'}
                    subtype={'text'}
                    customStyles={applyStyles([styles], 'customInput')}
                    register={register}
                    errors={errors}
                    rules={{
                        required: 'Subject is required'
                    }}
                    />
                <Textarea
                    name={'text'}
                    label={'Text'}
                    customStyles={applyStyles([styles], 'customInput')}
                    register={register}
                    errors={errors}
                    />
                <Textarea
                    name={'html'}
                    label={'Html'}
                    customStyles={applyStyles([styles], 'customInput')}
                    register={register}
                    errors={errors}
                    />
                <ButtonGroup
                    customStyles={applyStyles([styles], 'customButtonGroup')}
                    >
                    <Button
                        label={'Send Email'}
                        customStyles={applyStyles([styles], 'customButton')}
                        />
                </ButtonGroup>
                </Form>
            </Card>
        </Layout>
    )
}
