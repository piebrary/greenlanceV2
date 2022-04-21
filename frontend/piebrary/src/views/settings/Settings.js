import { useContext, useState } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Form from '../../components/basic/form/Form'
import Layout from '../../components/basic/layouts/simpleMenuLeft/Layout'
import Card from '../../components/basic/card/Card'
import Grid from '../../components/basic/grid/Grid'

import { menuItems } from '../../assets/menu/items'

import { filterStyles } from '../../utils/filterStyles'

import styles from './Settings.module.css'

export default function Settings(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin, userData } = useContext(UserContext)

    const languageSelectOptions = [{ value:'nl', name:'nederlands' }, { value:'en', name:'english' }]
    const timeFormatSelectOptions = [{ value:'HH:mm:ss', name:translate('24HOUR')}, { value:'hh:mm:ss A', name:translate('AMPM') }]
    const dateFormatSelectOptions = [{ value:'DD-MM-yyyy', name:'dd-mm-yyyy'}, { value:'MM-DD-yyyy', name:'mm-dd-yyyy' }]

    const [tempUserData, setTempUserData] = useState(userData)

    function modifyTempUserData(key, prop){

        setTempUserData(previous => {

            previous[key] = prop

            return previous

        })

    }

    function resetTempUserData(event){

        event.preventDefault()

        console.log('resetting')

        setTempUserData(userData)

    }

    return (
        <Layout
            className={styles.container}
            menuItems={menuItems({ isAdmin, translate })}
            pageTitle={translate('SETTINGS')}>
            <Grid customStyles={filterStyles([styles], 'grid1')}>
                <Card
                    title={translate('REGIONAL_SETTINGS')}
                    customStyles={filterStyles([styles], 'card1')}>
                    <Form
                        settings={{}}
                        onSubmit={data => console.log(data)}
                        customStyles={filterStyles([styles], 'form1')}
                        elements={[
                            {
                                type:'select',
                                label:translate('LANGUAGE'),
                                name:'language',
                                options:languageSelectOptions,
                                selectedOption:tempUserData.settings.language,
                                onChange:data => modifyTempUserData('language', data)
                            },
                            {
                                type:'select',
                                label:translate('DATE_FORMAT'),
                                name:'dateFormat',
                                options:dateFormatSelectOptions,
                                selectedOption:tempUserData.settings.dateFormat,
                                onChange:data => modifyTempUserData('dateFormat', data)
                            },
                            {
                                type:'select',
                                label:translate('TIME_FORMAT'),
                                name:'timeFormat',
                                options:timeFormatSelectOptions,
                                selectedOption:tempUserData.settings.timeFormat,
                                onChange:data => modifyTempUserData('timeFormat', data)
                            },
                        ]}
                        buttons={[
                            {
                                type:'button',
                                subtype:'submit',
                                label:translate('SAVE')
                            },
                            {
                                type:'button',
                                subtype:'reset',
                                label:translate('RESET'),
                                onClick:event => resetTempUserData(event)
                            },
                        ]}
                        />
                </Card>
                <Card
                    title={translate('CREDENTIALS')}
                    customStyles={filterStyles([styles], 'card2')}>
                    <Form
                        settings={{}}
                        onSubmit={data => console.log(data)}
                        customStyles={filterStyles([styles], 'form1')}
                        elements={[
                            {
                                type:'immutable',
                                label:translate('USERNAME'),
                                name:'username',
                                placeholder:tempUserData.username
                            },
                            {
                                type:'input',
                                subtype:'text',
                                label:translate('EMAIL'),
                                name:'Emailaddress',
                                placeholder:tempUserData.email,
                                rules:{
                                    required: true
                                },
                            },
                            {
                                type:'input',
                                subtype:'password',
                                label:translate('NEW_PASSWORD'),
                                name:'newPassword',
                                placeholder:'-',
                                rules:{
                                    required: true
                                },
                            },
                            {
                                type:'input',
                                subtype:'password',
                                label:translate('REPEAT_PASSWORD'),
                                name:'newPassword2',
                                placeholder:'-',
                                rules:{
                                    required: true
                                },
                            },
                            {
                                type:'input',
                                subtype:'password',
                                label:translate('CURRENT_PASSWORD'),
                                name:'currentPassword',
                                placeholder:'-',
                                rules:{
                                    required: true
                                },
                            },
                        ]}
                        buttons={[
                            {
                                type:'button',
                                subtype:'submit',
                                label:translate('SAVE')
                            },
                            {
                                type:'button',
                                subtype:'reset',
                                label:translate('RESET'),
                                onClick:event => resetTempUserData(event)
                            },
                        ]}
                        />
                </Card>
            </Grid>
        </Layout>
    )
}
