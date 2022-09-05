import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Grid from '../../components/grid/Grid'
import Button from '../../components/button/Button'
import Layout from '../../components/layouts/simpleMenuLeft/Layout.js'
import Card from '../../components/card/Card.js'
import Input from '../../components/formElements/input/Input.js'
import Form from '../../components/form/Form'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'
import Checkbox from '../../components/formElements/checkbox/Checkbox'
import Select from '../../components/formElements/select/Select'
import Radio from '../../components/formElements/radio/Radio'
import Textarea from '../../components/formElements/textarea/Textarea'
import Datalist from '../../components/formElements/datalist/Datalist'

import { menuitems } from '../../assets/js/menu/items'

import { applyStyles } from '../../utils/applyStyles'
import { containsNumber } from '../../utils/containsNumber'

import styles from './Form.module.css'

export default function FormView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, isAdmin, settings } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm()

    createTranslation('FormView.introMessage', {
        en:'The form component can be used to quickly build forms. It supports all normal form elements and provides validations and error messages.',
        nl:'De Formulier module kan gebruikt worden om snel en eenvoudig formulieren op te bouwen. Alle gangbare Formulier elementen kunnen gebruikt worden en de module biedt ook validering en foutmeldingen.'
    })

    createTranslation('FormView.TEXT_INPUT_LABEL', {
        en:'Text input',
        nl:'Tekst invoer'
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

    createTranslation('FormView.PASSWORD_INPUT_LABEL', {
        en:'Password input',
        nl:'Wachtwoord invoer'
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

    createTranslation('FormView.DATETIME_LABEL', {
        en:'Date & time',
        nl:'Datum & tijd'
    })

    createTranslation('FormView.DATETIME_PICKER_EXAMPLE', {
        en:'Select a date and time',
        nl:'Selecteer een datum en tijd'
    })

    createTranslation('FormView.RADIO_LABEL', {
        en:'Radiobutton',
        nl:'Radiobutton'
    })

    createTranslation('FormView.RADIO_NORMAL', {
        en:'Normal',
        nl:'Normaal'
    })

    createTranslation('FormView.RADIO_SELECTED', {
        en:'Selected',
        nl:'Geselecteerd'
    })

    createTranslation('FormView.RADIO_DISABLED', {
        en:'Disabled',
        nl:'Geblokkeerd'
    })

    createTranslation('FormView.TEXTAREA_LABEL', {
        en:'Textarea',
        nl:'Tekstvlak'
    })

    createTranslation('FormView.TEXTAREA_EXAMPLE', {
        en:'Write something in the textarea',
        nl:'Typ iets in het tekstvlak'
    })

    createTranslation('FormView.DATALIST_LABEL', {
        en:'Datalist',
        nl:'Data lijst'
    })

    createTranslation('FormView.DATALIST_EXAMPLE', {
        en:'Pick an option from the datalist',
        nl:'Kies een optie uit de data lijst'
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
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('FORM')}>
            <Card>
                {applyTranslation('FormView.introMessage')}
            </Card>
            <Card>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    >
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.TEXT_INPUT_LABEL')}
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
                        placeholder={applyTranslation('FormView.DISABLED_INPUT_DEFAULT_VALUE')}
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
                        passwordToggle={true}
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
                        {applyTranslation('FormView.RADIO_LABEL')}
                    </div>
                    <Radio
                        name={'radioExample'}
                        label={applyTranslation('FormView.RADIO_LABEL')}
                        register={register}
                        errors={errors}
                        options={[
                            {
                                name:applyTranslation('FormView.RADIO_NORMAL'),
                                value:'normal',
                            },{
                                name:applyTranslation('FormView.RADIO_SELECTED'),
                                value:'selected',
                                checked:true,
                            },{
                                name:applyTranslation('FormView.RADIO_DISABLED'),
                                value:'disabled normal',
                                disabled:true,
                            },
                        ]}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.DATE_LABEL')}
                    </div>
                    <Input
                        label={applyTranslation('FormView.DATEPICKER_EXAMPLE')}
                        name={'datePickerInput'}
                        type={'date'}
                        defaultValue={'2022-08-05'}
                        register={register}
                        errors={errors}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.TIME_LABEL')}
                    </div>
                    <Input
                        label={applyTranslation('FormView.TIMEPICKER_EXAMPLE')}
                        name={'timePickerInput'}
                        type={'time'}
                        defaultValue={'22:15'}
                        register={register}
                        errors={errors}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.DATETIME_LABEL')}
                    </div>
                    <Input
                        label={applyTranslation('FormView.DATETIME_PICKER_EXAMPLE')}
                        name={'dateTimePickerInput'}
                        type={'datetime-local'}
                        defaultValue={'2022-08-05T01:50'}
                        register={register}
                        errors={errors}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.TEXTAREA_LABEL')}
                    </div>
                    <Textarea
                        label={applyTranslation('FormView.TEXTAREA_EXAMPLE')}
                        name={'textArea'}
                        register={register}
                        errors={errors}
                        rows={8}
                        defaultValue={`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}
                        />
                    <div className={styles.categoryLabel}>
                        {applyTranslation('FormView.DATALIST_LABEL')}
                    </div>
                    <Datalist
                        label={applyTranslation('FormView.DATALIST_EXAMPLE')}
                        name={'datalistExample'}
                        register={register}
                        errors={errors}
                        options={[
                            {
                                name:'Amsterdam',
                                value:'amsterdam'
                            },
                            {
                                name:'Utrecht',
                                value:'utrecht'
                            },
                            {
                                name:'Zwolle',
                                value:'zwolle'
                            }
                        ]}
                        />
                    <ButtonGroup>
                        <Button
                            label={applyTranslation('SAVE')}
                            onClick={() => handleSubmit(onSubmit)}
                            />
                        <Button
                            label={applyTranslation('RESET')}
                            onClick={onReset}
                            />
                    </ButtonGroup>
                </Form>
            </Card>
        </Layout>
    )
}
