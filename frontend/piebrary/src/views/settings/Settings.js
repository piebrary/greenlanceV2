import { useContext, useState } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Form from '../../components/basic/form/Form'
import Layout from '../../components/basic/layouts/simpleMenuLeft/Layout'
import Card from '../../components/basic/card/Card'
import Grid from '../../components/basic/grid/Grid'
import Input from '../../components/basic/input/Input'
import Button from '../../components/basic/button/Button'
import ButtonGroup from '../../components/basic/buttonGroup/ButtonGroup'
import Select from '../../components/basic/select/Select'

import { menuitems } from '../../assets/js/menu/items'
import { languageSelectOptions } from '../../assets/js/settings/language'
import { dateFormatSelectOptions } from '../../assets/js/settings/dateFormat'
import { timeFormatSelectOptions } from '../../assets/js/settings/timeFormat'

import { filterStyles } from '../../utils/filterStyles'

import styles from './Settings.module.css'

export default function Settings(){

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const { translate } = useContext(LanguageContext)
    const { isAdmin, userData } = useContext(UserContext)

    function test1FormSubmit(data){

        console.log(data)

    }

    return (
        <Layout
            className={styles.container}
            menuitems={menuitems({ isAdmin, translate })}
            pageTitle={translate('SETTINGS')}>
            <Grid customStyles={filterStyles([styles], 'grid1')}>
                <Card
                    title={translate('REGIONAL_SETTINGS')}
                    customStyles={filterStyles([styles], 'card1')}>
                    <Form
                        onSubmit={handleSubmit(test1FormSubmit)}
                        customStyles={filterStyles([styles], 'testform')}>
                        <Select
                            name={'languageSelect'}
                            label={translate('LANGUAGE')}
                            options={languageSelectOptions}
                            defaultValue={languageSelectOptions.find(o => o.value === userData.settings.language)}
                            register={register}
                            errors={errors}
                            />
                        <Select
                            name={'dateFormatSelect'}
                            label={translate('DATE_FORMAT')}
                            options={dateFormatSelectOptions}
                            defaultValue={dateFormatSelectOptions.find(o => o.value === userData.settings.dateFormat)}
                            register={register}
                            errors={errors}
                            />
                        <Select
                            name={'timeFormatSelect'}
                            label={translate('TIME_FORMAT')}
                            options={timeFormatSelectOptions}
                            defaultValue={timeFormatSelectOptions.find(o => o.value === userData.settings.timeFormat)}
                            register={register}
                            errors={errors}
                            />
                    </Form>
                </Card>
                <Card
                    title={translate('CREDENTIALS')}
                    customStyles={filterStyles([styles], 'card2')}>
                    <Form
                        onSubmit={handleSubmit(test1FormSubmit)}
                        customStyles={filterStyles([styles], 'testform')}>
                        <Input
                            label={translate('USERNAME')}
                            name={'username'}
                            subtype={'text'}
                            defaultValue={userData.username}
                            onChange={data => console.log('USERNAME CHANGE', data)}
                            readOnly={true}
                            register={register}
                            errors={errors}
                            />
                        <Input
                            label={translate('EMAIL')}
                            name={'emailAddress'}
                            subtype={'text'}
                            defaultValue={userData.email}
                            onChange={data => console.log('EMAIL CHANGE', data)}
                            register={register}
                            errors={errors}
                            />
                        <Input
                            label={translate('NEW_PASSWORD')}
                            name={'newPassword'}
                            subtype={'password'}
                            onChange={data => console.log('NEW PASSWORD CHANGE', data)}
                            hideToggle={true}
                            register={register}
                            errors={errors}
                            />
                        <Input
                            label={translate('REPEAT_PASSWORD')}
                            name={'repeatPassword'}
                            subtype={'password'}
                            onChange={data => console.log('REPEAT PASSWORD CHANGE', data)}
                            hideToggle={true}
                            register={register}
                            errors={errors}
                            />
                        <Input
                            label={translate('CURRENT_PASSWORD')}
                            name={'currentPassword'}
                            subtype={'password'}
                            onChange={data => console.log('CURRENT PASSWORD CHANGE', data)}
                            hideToggle={true}
                            register={register}
                            errors={errors}
                            rules={{
                                required:'Current password is required.'
                            }}
                            />
                        <Button
                            label={'submit'}
                            />
                    </Form>
                </Card>
            </Grid>
        </Layout>
    )
}
