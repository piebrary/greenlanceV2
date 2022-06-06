import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Grid from '../../components/grid/Grid'
import Button from '../../components/button/Button'
import Layout from '../../components/layouts/simpleMenuLeft/Layout.js'
import Card from '../../components/card/Card.js'
import Input from '../../components/input/Input.js'
import Form from '../../components/form/Form'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'
import Checkbox from '../../components/checkbox/Checkbox'
import Select from '../../components/select/Select'
import DatePicker from '../../components/datePicker/DatePicker'
import TimePicker from '../../components/timePicker/TimePicker'

import { menuitems } from '../../assets/js/menu/items'

import { applyStyles } from '../../utils/applyStyles'
import { containsNumber } from '../../utils/containsNumber'

import styles from './Form.module.css'

export default function FormView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { isAdmin, settings } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm()

    createTranslation('FormView.introMessage', {
        en:'The form component can be used to quickly build forms. It supports all normal form elements and provides validations and error messages.',
        nl:'De Formulier module kan gebruikt worden om snel en eenvoudig formulieren op te bouwen. Alle gangbare Formulier elementen kunnen gebruikt worden en de module biedt ook validering en foutmeldingen.'
    })

    createTranslation('FormView.INPUT_LABEL', {
        en:'Input',
        nl:'Input'
    })

    createTranslation('FormView.DISABLED_INPUT', {
        en:'Disabled input',
        nl:'Geblokkeerd invoer'
    })

    createTranslation('FormView.DISABLED_INPUT_DEFAULT_VALUE', {
        en:'Default value',
        nl:'Standaard waarde'
    })

    createTranslation('FormView.NORMAL_INPUT', {
        en:'Normal input',
        nl:'Normaal invoer'
    })

    createTranslation('FormView.PASSWORD_INPUT', {
        en:'Password input',
        nl:'Wachtwoord invoer'
    })

    createTranslation('FormView.PASSWORD_TOGGLE_INPUT', {
        en:'Password input with privacy toggle',
        nl:'Wachtwoord invoer met privacy schakelaar'
    })

    createTranslation('FormView.CHECKBOX_LABEL', {
        en:'Checkbox',
        nl:'Checkbox'
    })

    createTranslation('FormView.CHECKBOX_NORMAL', {
        en:'Normal',
        nl:'Normaal'
    })

    createTranslation('FormView.CHECKBOX_SELECTED', {
        en:'Selected',
        nl:'Geselecteerd'
    })

    createTranslation('FormView.CHECKBOX_DISABLED', {
        en:'Disabled',
        nl:'Geblokkeerd'
    })

    createTranslation('FormView.SELECT_LABEL', {
        en:'Select',
        nl:'Select'
    })

    createTranslation('FormView.SELECT_EXAMPLE', {
        en:'Use Select to choose from a list of options',
        nl:'Gebruik Select om te kiezen uit een lijst met opties'
    })

    createTranslation('FormView.OPTION_1', {
        en:'Option 1',
        nl:'Optie 1'
    })

    createTranslation('FormView.OPTION_2', {
        en:'Option 2',
        nl:'Optie 2'
    })

    createTranslation('FormView.OPTION_3', {
        en:'Option 3',
        nl:'Optie 3'
    })

    createTranslation('FormView.DATE_LABEL', {
        en:'Date',
        nl:'Datum'
    })

    createTranslation('FormView.DATEPICKER_EXAMPLE', {
        en:'Select a date',
        nl:'Selecteer een datum'
    })

    createTranslation('FormView.TIME_LABEL', {
        en:'Time',
        nl:'Tijd'
    })

    createTranslation('FormView.TIMEPICKER_EXAMPLE', {
        en:'Select a time',
        nl:'Selecteer een tijd'
    })

    function onSubmit(data){

        alert(JSON.stringify(data))

    }

    function onReset(event){

        event.preventDefault()

        reset()

    }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ isAdmin, applyTranslation })}
            title={applyTranslation('FORM')}>
            <Card
                customStyles={applyStyles([styles], 'card1')}>
                {applyTranslation('FormView.introMessage')}
            </Card>
            <Card>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    >
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.INPUT_LABEL')}
                    </div>
                    <Input
                        label={applyTranslation('FormView.DISABLED_INPUT')}
                        name={'disabledInput'}
                        type={'text'}
                        readOnly={true}
                        defaultValue={applyTranslation('FormView.DISABLED_INPUT_DEFAULT_VALUE')}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        label={applyTranslation('FormView.NORMAL_INPUT')}
                        name={'normalInput'}
                        type={'text'}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        label={applyTranslation('FormView.PASSWORD_INPUT')}
                        name={'passwordInput'}
                        type={'password'}
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
                                    if(getValues().passwordInput === getValues().passwordToggleInput) return true
                                    return 'Passwords don\'t match'
                                }
                            }
                        }}
                        />
                    <Input
                        label={applyTranslation('FormView.PASSWORD_TOGGLE_INPUT')}
                        name={'passwordToggleInput'}
                        type={'password'}
                        hideToggle={true}
                        register={register}
                        errors={errors}
                        rules={{
                            validate:{
                                passwordsMatch: () => {
                                    if(getValues().passwordInput === getValues().passwordToggleInput) return true
                                    return 'Passwords don\'t match'
                                }
                            }
                        }}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.CHECKBOX_LABEL')}
                    </div>
                    <Checkbox
                        label={applyTranslation('FormView.CHECKBOX_LABEL')}
                        register={register}
                        errors={errors}
                        options={[
                            {
                                name:applyTranslation('FormView.CHECKBOX_NORMAL'),
                                value:'normal',
                                checked:false,
                            },{
                                name:applyTranslation('FormView.CHECKBOX_SELECTED'),
                                value:'selected',
                                checked:true,
                            },{
                                name:applyTranslation('FormView.CHECKBOX_DISABLED'),
                                value:'disabled normal',
                                disabled:true,
                            }
                        ]}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.SELECT_LABEL')}
                    </div>
                    <Select
                        name={'selectExample'}
                        label={applyTranslation('FormView.SELECT_EXAMPLE')}
                        options={[
                            {
                                name:applyTranslation('FormView.OPTION_1'),
                                value:'firstOption',
                            }, {
                                name:applyTranslation('FormView.OPTION_2'),
                                value:'secondOption',
                            }, {
                                name:applyTranslation('FormView.OPTION_3'),
                                value:'thirdOption'
                            }
                        ]}
                        defaultValue={{
                            value:'firstOption'
                        }}
                        register={register}
                        errors={errors}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.DATE_LABEL')}
                    </div>
                    <DatePicker
                        label={applyTranslation('FormView.DATEPICKER_EXAMPLE')}
                        name={'dateInput'}
                        min={'2022-04-01'}
                        max={'2023-08-04'}
                        register={register}
                        setValue={setValue}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.TIME_LABEL')}
                    </div>
                    <TimePicker
                        label={applyTranslation('FormView.TIMEPICKER_EXAMPLE')}
                        name={'timeInput'}
                        min={'12:10'}
                        max={'18:15'}
                        register={register}
                        setValue={setValue}
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
