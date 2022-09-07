import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import { sendEmail } from '../../../default/services/EmailService'

import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Button from '../../../default/components/button/Button'

import { menuitems } from '../../../default/assets/js/menu/items'
import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Email.module.css'

export default function EmailView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, isAdmin } = useContext(UserContext)

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('EMAIL')}>
            <Button
            label={'Click to send automated email to piedema@gmail.com'}
                onClick={event => {

                    sendEmail({
                    	to: 'piedema@gmail.com',
                    	from: '"PieBrary" <mail@piebrary.nl>', // Make sure you don't forget the < > brackets
                    	subject: 'Testing a mail with Nodemailer',
                    	text: 'Your message in text', // Optional, but recommended
                    	html: '<h1>Hi</h1><br /><p>Your message</p>', // Optional
                    })

                }}
                />
        </Layout>
    )
}
