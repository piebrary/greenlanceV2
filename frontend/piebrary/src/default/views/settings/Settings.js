import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Form from '../../components/form/Form'
import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'
import Select from '../../components/select/Select'

import { menuitems } from '../../assets/js/menu/items'
import { languageOptions } from '../../assets/js/settings/language'
import { dateFormatOptions } from '../../assets/js/settings/dateFormat'
import { timeFormatOptions } from '../../assets/js/settings/timeFormat'

import { filterStyles } from '../../utils/filterStyles'
import { containsNumber } from '../../utils/containsNumber'

import styles from './Settings.module.css'

export default function Settings(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin, userData, saveUserData } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()

    function onSubmit(data){

        data._id = userData._id

        saveUserData(data)

    }

    function onReset(event){

        event.preventDefault()

        reset()

    }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ isAdmin, translate })}
            title={translate('SETTINGS')}>
            <Card
                customStyles={filterStyles([styles], 'card1')}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    customStyles={filterStyles([styles], 'testform')}>
                    <div className={styles.categoryLabel}>
                        {translate('CREDENTIALS')}
                    </div>
                    <Input
                        label={translate('USERNAME')}
                        name={'username'}
                        type={'text'}
                        defaultValue={userData.username}
                        readOnly={true}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        label={translate('EMAIL')}
                        name={'email'}
                        type={'text'}
                        defaultValue={userData.email}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        label={translate('NEW_PASSWORD')}
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
                        label={translate('REPEAT_PASSWORD')}
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
                        label={translate('CURRENT_PASSWORD')}
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
                        {translate('REGIONAL_SETTINGS')}
                    </div>
                    <Select
                        name={'settings.language'}
                        label={translate('LANGUAGE')}
                        options={languageOptions}
                        defaultValue={languageOptions.find(o => o.value === userData.settings.language)}
                        register={register}
                        errors={errors}
                        />
                    <Select
                        name={'settings.dateFormat'}
                        label={translate('DATE_FORMAT')}
                        options={dateFormatOptions}
                        defaultValue={dateFormatOptions.find(o => o.value === userData.settings.dateFormat)}
                        register={register}
                        errors={errors}
                        />
                    <Select
                        name={'settings.timeFormat'}
                        label={translate('TIME_FORMAT')}
                        options={timeFormatOptions}
                        defaultValue={timeFormatOptions.find(o => o.value === userData.settings.timeFormat)}
                        register={register}
                        errors={errors}
                        />
                    <ButtonGroup>
                        <Button
                            label={translate('SAVE')}
                            onClick={() => handleSubmit(onSubmit)}
                            />
                        <Button
                            customStyles={filterStyles([styles], 'reset')}
                            label={translate('RESET')}
                            onClick={onReset}
                            />
                    </ButtonGroup>
                </Form>
            </Card>
        </Layout>
    )
}
