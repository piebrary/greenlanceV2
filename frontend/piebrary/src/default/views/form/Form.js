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
import Time from '../../components/time/Time'

import { menuitems } from '../../assets/js/menu/items'

import { filterStyles } from '../../utils/filterStyles'
import { containsNumber } from '../../utils/containsNumber'

import styles from './Form.module.css'

export default function FormView(){

    const { translate, addTranslation } = useContext(LanguageContext)
    const { isAdmin, settings } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm()

    addTranslation('FormView.introMessage', {
        en:'The form component can be used to quickly build forms. It supports all normal form elements and provides validations and error messages.',
        nl:'De Formulier module kan gebruikt worden om snel en eenvoudig formulieren op te bouwen. Alle gangbare Formulier elementen kunnen gebruikt worden en de module biedt ook validering en foutmeldingen.'
    })

    addTranslation('FormView.INPUT_LABEL', {
        en:'Input',
        nl:'Input'
    })

    addTranslation('FormView.DISABLED_INPUT', {
        en:'Disabled input',
        nl:'Geblokkeerd invoer'
    })

    addTranslation('FormView.DISABLED_INPUT_DEFAULT_VALUE', {
        en:'Default value',
        nl:'Standaard waarde'
    })

    addTranslation('FormView.NORMAL_INPUT', {
        en:'Normal input',
        nl:'Normaal invoer'
    })

    addTranslation('FormView.PASSWORD_INPUT', {
        en:'Password input',
        nl:'Wachtwoord invoer'
    })

    addTranslation('FormView.PASSWORD_TOGGLE_INPUT', {
        en:'Password input with privacy toggle',
        nl:'Wachtwoord invoer met privacy schakelaar'
    })

    addTranslation('FormView.CHECKBOX_LABEL', {
        en:'Checkbox',
        nl:'Checkbox'
    })

    addTranslation('FormView.CHECKBOX_NORMAL', {
        en:'Normal',
        nl:'Normaal'
    })

    addTranslation('FormView.CHECKBOX_SELECTED', {
        en:'Selected',
        nl:'Geselecteerd'
    })

    addTranslation('FormView.CHECKBOX_DISABLED', {
        en:'Disabled',
        nl:'Geblokkeerd'
    })

    addTranslation('FormView.SELECT_LABEL', {
        en:'Select',
        nl:'Select'
    })

    addTranslation('FormView.SELECT_EXAMPLE', {
        en:'Use Select to choose from a list of options',
        nl:'Gebruik Select om te kiezen uit een lijst met opties'
    })

    addTranslation('FormView.OPTION_1', {
        en:'Option 1',
        nl:'Optie 1'
    })

    addTranslation('FormView.OPTION_2', {
        en:'Option 2',
        nl:'Optie 2'
    })

    addTranslation('FormView.OPTION_3', {
        en:'Option 3',
        nl:'Optie 3'
    })

    addTranslation('FormView.DATE_LABEL', {
        en:'Date',
        nl:'Datum'
    })

    addTranslation('FormView.TIME_LABEL', {
        en:'Time',
        nl:'Tijd'
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
            items={menuitems({ isAdmin, translate })}
            title={translate('FORM')}>
            <Card
                customStyles={filterStyles([styles], 'card1')}>
                {translate('FormView.introMessage')}
            </Card>
            <Card>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    >
                    <div className={styles.categoryLabel}>
                        {translate('FormView.INPUT_LABEL')}
                    </div>
                    <Input
                        label={translate('FormView.DISABLED_INPUT')}
                        name={'disabledInput'}
                        type={'text'}
                        readOnly={true}
                        defaultValue={translate('FormView.DISABLED_INPUT_DEFAULT_VALUE')}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        label={translate('FormView.NORMAL_INPUT')}
                        name={'normalInput'}
                        type={'text'}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        label={translate('FormView.PASSWORD_INPUT')}
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
                        label={translate('FormView.PASSWORD_TOGGLE_INPUT')}
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
                        {translate('FormView.CHECKBOX_LABEL')}
                    </div>
                    <Checkbox
                        label={translate('FormView.CHECKBOX_LABEL')}
                        register={register}
                        errors={errors}
                        options={[
                            {
                                name:translate('FormView.CHECKBOX_NORMAL'),
                                value:'normal',
                                checked:false,
                            },{
                                name:translate('FormView.CHECKBOX_SELECTED'),
                                value:'selected',
                                checked:true,
                            },{
                                name:translate('FormView.CHECKBOX_DISABLED'),
                                value:'disabled normal',
                                disabled:true,
                            }
                        ]}
                        />
                    <div className={styles.categoryLabel}>
                        {translate('FormView.SELECT_LABEL')}
                    </div>
                    <Select
                        name={'selectExample'}
                        label={translate('FormView.SELECT_EXAMPLE')}
                        options={[
                            {
                                name:translate('FormView.OPTION_1'),
                                value:'firstOption',
                            }, {
                                name:translate('FormView.OPTION_2'),
                                value:'secondOption',
                            }, {
                                name:translate('FormView.OPTION_3'),
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
                        {translate('FormView.DATE_LABEL')}
                    </div>
                    <DatePicker
                        label={'Select a date'}
                        name={'dateInput'}
                        min={'2022-06-19'}
                        max={'2022-07-02'}
                        register={register}
                        errors={errors}
                        />
                    <div className={styles.categoryLabel}>
                        {translate('FormView.TIME_LABEL')}
                    </div>
                    <Time
                        label={'Select a time'}
                        name={'timeInput'}
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
