import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import { sendEmail } from '../../services/EmailService'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Button from '../../components/button/Button'

import { menuitems } from '../../assets/js/menu/items'
import { applyStyles } from '../../utils/applyStyles'

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
