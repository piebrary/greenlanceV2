import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Form from '../../components/form/Form'
import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Input from '../../components/formElements/input/Input'
import Button from '../../components/button/Button'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'
import Select from '../../components/formElements/select/Select'

import { menuitems } from '../../assets/js/menu/items'
import { languageOptions } from '../../assets/js/settings/language'
import { dateFormatOptions } from '../../assets/js/settings/dateFormat'
import { timeFormatOptions } from '../../assets/js/settings/timeFormat'

import { applyStyles } from '../../utils/applyStyles'
import { containsNumber } from '../../utils/containsNumber'
import { notificationManager } from '../../utils/notifications'

import styles from './Settings.module.css'

export default function Settings(){

    const { applyTranslation } = useContext(LanguageContext)
    const { isAdmin, userData, saveUserData } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()

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

    function onReset(event){

        event.preventDefault()

        reset()

    }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ isAdmin, applyTranslation })}
            title={applyTranslation('SETTINGS')}>
            <Card
                customStyles={applyStyles([styles], 'card1')}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    customStyles={applyStyles([styles], 'testform')}>
                    <div className={styles.categoryLabel}>
                        {applyTranslation('CREDENTIALS')}
                    </div>
                    <Input
                        label={applyTranslation('USERNAME')}
                        name={'username'}
                        type={'text'}
                        defaultValue={userData.username}
                        readOnly={true}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        label={applyTranslation('EMAIL')}
                        name={'email'}
                        type={'text'}
                        defaultValue={userData.email[0].email}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        label={applyTranslation('NEW_PASSWORD')}
                        name={'newPassword'}
                        type={'password'}
                        hideToggle={true}
                        register={register}
                        errors={errors}
                        rules={{
                            validate:{
                                minLength: value => {
                                    if(value.length === 0 || value.length > 7) return true
                                    return 'New password is too short'
                                },
                                minNumbers: value => {
                                    if(value.length === 0 || containsNumber(value)) return true
                                    return 'New password must contain at least one number'
                                },
                                passwordsMatch: () => {
                                    if(getValues().newPassword === getValues().repeatPassword) return true
                                    return 'Passwords don\'t match'
                                }
                            }
                        }}
                        />
                    <Input
                        label={applyTranslation('REPEAT_PASSWORD')}
                        name={'repeatPassword'}
                        type={'password'}
                        hideToggle={true}
                        register={register}
                        errors={errors}
                        rules={{
                            validate:{
                                passwordsMatch: () => {
                                    if(getValues().newPassword === getValues().repeatPassword) return true
                                    return 'Passwords don\'t match'
                                }
                            }
                        }}
                        />
                    <Input
                        label={applyTranslation('CURRENT_PASSWORD')}
                        name={'currentPassword'}
                        type={'password'}
                        hideToggle={true}
                        register={register}
                        errors={errors}
                        rules={{
                            validate:{
                                credentialsChanged: value => {
                                    if(
                                        value.length > 0
                                        || (
                                            getValues().email === userData.email
                                            && getValues().newPassword.length === 0
                                        )
                                    ) return true
                                    return 'Current password is required'
                                }
                            }
                        }}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('REGIONAL_SETTINGS')}
                    </div>
                    <Select
                        name={'settings.language'}
                        label={applyTranslation('LANGUAGE')}
                        options={languageOptions}
                        defaultValue={languageOptions.find(o => o.value === userData.settings.language)}
                        register={register}
                        errors={errors}
                        />
                    <Select
                        name={'settings.dateFormat'}
                        label={applyTranslation('DATE_FORMAT')}
                        options={dateFormatOptions}
                        defaultValue={dateFormatOptions.find(o => o.value === userData.settings.dateFormat)}
                        register={register}
                        errors={errors}
                        />
                    <Select
                        name={'settings.timeFormat'}
                        label={applyTranslation('TIME_FORMAT')}
                        options={timeFormatOptions}
                        defaultValue={timeFormatOptions.find(o => o.value === userData.settings.timeFormat)}
                        register={register}
                        errors={errors}
                        />
                    <ButtonGroup>
                        <Button
                            label={applyTranslation('SAVE')}
                            onClick={() => handleSubmit(onSubmit)}
                            />
                        <Button
                            customStyles={applyStyles([styles], 'reset')}
                            label={applyTranslation('RESET')}
                            onClick={onReset}
                            />
                    </ButtonGroup>
                </Form>
            </Card>
        </Layout>
    )
}
