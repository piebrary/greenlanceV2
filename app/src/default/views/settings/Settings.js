import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Form from '../../../default/components/form/Form'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import ButtonGroup from '../../../default/components/buttonGroup/ButtonGroup'
import Select from '../../../default/components/formElements/select/Select'

import { menuitems } from '../../../default/assets/js/menu/items'
import { languageOptions } from '../../../default/assets/js/settings/language'

import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'
import { notificationManager } from '../../../default/utils/notifications'

import styles from './Settings.module.css'

export default function Settings(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, isAdmin, saveUserData } = useContext(UserContext)

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
            items={menuitems({ userData, isAdmin, applyTranslation })}
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
                        defaultValue={userData.email}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        label={applyTranslation('NEW_PASSWORD')}
                        name={'newPassword'}
                        type={'password'}
                        passwordToggle={true}
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
                                }
                            }
                        }}
                        />
                    <Input
                        label={applyTranslation('REPEAT_PASSWORD')}
                        name={'repeatPassword'}
                        type={'password'}
                        passwordToggle={true}
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
                        passwordToggle={true}
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
