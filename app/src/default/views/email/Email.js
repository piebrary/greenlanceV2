import { useContext, useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { EmailSchema } from '../../schemas/Email'

import { sendEmail } from '../../../default/services/EmailService'

import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Button from '../../../default/components/button/Button'
import Input from '../../../default/components/formElements/input/Input.js'
import Form from '../../../default/components/form/Form'
import Label from '../../../default/components/label/Label'
import Select from '../../../default/components/formElements/select/Select'
import Textarea from '../../../default/components/formElements/textarea/Textarea'
import Controls from '../../../default/components/controls/Controls'

import { menuitems } from '../../../default/assets/js/menu/items'
import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Email.module.css'

export default function EmailView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    function onSubmit(data){

        sendEmail(data)

    }

    createTranslation('EmailView.INTRO', {
        en:`With PieBrary it is very simple to send emails. These can be automated or manually send. All it takes is a Form Component to create the email and PieBrary handles the rest. Recurring emails or templates are optionable.`,
        nl:'Met PieBrary is het eenvoudig om emails te versturen. Deze email kunnen automatisch of handmatig verzonden worden. Het enige dat hiervoor nodig is is een Form Component om de email op te stellen en PieBrary doet de rest. Herhalende emails of templates behoren ook tot de mogelijkheden.'
    })

    createTranslation('EmailView.SEND_EMAIL', {
        en:'Test sending an email',
        nl:'Verstuur een test email'
    })

    createTranslation('EmailView.TO', {
        en:'To',
        nl:'Naar'
    })

    createTranslation('EmailView.FROM', {
        en:'From',
        nl:'Naar'
    })

    createTranslation('EmailView.SUBJECT', {
        en:'Subject',
        nl:'Onderwerp'
    })

    createTranslation('EmailView.MESSAGE', {
        en:'Message',
        nl:'Bericht'
    })

    const defaultValues = {
        to:'',
        from:`${process.env.REACT_APP_NO_REPLY_EMAIL}`,
        subject:'',
        message:''
    }

    return (
        <Layout
            items={menuitems({ userData, hasRole, applyTranslation })}
            title={applyTranslation('EMAIL')}
            controls={<Controls />}
            >
            <Card>
                {applyTranslation('EmailView.INTRO')}
            </Card>
            <Card>
                <Form
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                    validationSchema={EmailSchema}
                    >
                    <Label>
                        {applyTranslation('EmailView.SEND_EMAIL')}
                    </Label>
                    <Input
                        label={applyTranslation('EmailView.TO')}
                        name={'to'}
                        shouldRegister
                        required
                        />
                    <Select
                        name={'from'}
                        label={applyTranslation('EmailView.FROM')}
                        options={[
                            {
                                name:applyTranslation(`${process.env.REACT_APP_NO_REPLY_EMAIL}`),
                                value:`${process.env.REACT_APP_NO_REPLY_EMAIL}`,
                            }
                        ]}
                        shouldRegister
                        required
                        />
                    <Input
                        label={applyTranslation('EmailView.SUBJECT')}
                        name={'subject'}
                        type={'text'}
                        shouldRegister
                        />
                    <Textarea
                        label={applyTranslation('EmailView.MESSAGE')}
                        name={'message'}
                        shouldRegister
                        rows={3}
                        />
                </Form>
            </Card>
        </Layout>
    )
}
