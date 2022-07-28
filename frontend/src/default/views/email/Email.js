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

    createTranslation('EmailView.to', {
        en:'To',
        nl:'Aan'
    })

    createTranslation('EmailView.from', {
        en:'From',
        nl:'Van'
    })

    createTranslation('EmailView.subject', {
        en:'Subject',
        nl:'Onderwerp'
    })

    createTranslation('EmailView.text', {
        en:'Text',
        nl:'Tekst'
    })

    createTranslation('EmailView.html', {
        en:'Html',
        nl:'Html'
    })

    createTranslation('EmailView.sendButton', {
        en:'Send email',
        nl:'Verstuur email'
    })

    createTranslation('EmailView.introText', {
        en:(
            <>
                You can easily send emails from you PieBrary email interface. This includes custom build layouts and just plain text.
                <br />
                These custom layouts can be created by the PieBrary Dev team on request.
            </>
        ),
        nl:(
            <>
                Het is erg makkelijk om via de email interface van PieBrary email te versturen. Dit geldt voor textuele emails maar ook voor op maat gemaakte layouts emails.
                <br />
                <br />
                Deze op maat gemaakte layouts kunnen door het PieBrary ontwikkelteam op verzoek ontworpen worden.
            </>
        ),    })

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('EMAIL')}>
            <Card>
                {applyTranslation('EmailView.introText')}
            </Card>
            <Card>
                <Form
                    onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        name={'to'}
                        label={applyTranslation('EmailView.to')}
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
                        label={applyTranslation('EmailView.from')}
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
                        label={applyTranslation('EmailView.subject')}
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
                        label={applyTranslation('EmailView.text')}
                        customStyles={applyStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        />
                    <Textarea
                        name={'html'}
                        label={applyTranslation('EmailView.html')}
                        customStyles={applyStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        />
                    <ButtonGroup
                        customStyles={applyStyles([styles], 'customButtonGroup')}
                        >
                        <Button
                            label={applyTranslation('EmailView.sendButton')}
                            customStyles={applyStyles([styles], 'customButton')}
                            />
                    </ButtonGroup>
                </Form>
            </Card>
        </Layout>
    )
}
