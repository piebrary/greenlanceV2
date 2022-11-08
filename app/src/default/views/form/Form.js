import { useContext } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Grid from '../../../default/components/grid/Grid'
import Label from '../../../default/components/label/Label'
import Button from '../../../default/components/button/Button'
import Layout from '../../../default/components/layouts/basic/Layout.js'
import Card from '../../../default/components/card/Card.js'
import Input from '../../../default/components/formElements/input/Input.js'
import MultipleInput from '../../../default/components/formElements/multipleInput/MultipleInput.js'
import Form from '../../../default/components/form/Form'
import Checkbox from '../../../default/components/formElements/checkbox/Checkbox'
import Select from '../../../default/components/formElements/select/Select'
import Radio from '../../../default/components/formElements/radio/Radio'
import Textarea from '../../../default/components/formElements/textarea/Textarea'
import Datalist from '../../../default/components/formElements/datalist/Datalist'
import Controls from '../../../default/components/controls/Controls'

import { menuitems } from '../../../default/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'

import styles from './Form.module.css'

export default function FormView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole, settings } = useContext(UserContext)

    createTranslation('FORMVIEW.introMessage', {
        en:'The form component can be used to quickly build forms. It supports all normal form elements and provides validations and error messages.',
        nl:'De Formulier module kan gebruikt worden om snel en eenvoudig formulieren op te bouwen. Alle gangbare Formulier elementen kunnen gebruikt worden en de module biedt ook validering en foutmeldingen.'
    })

    createTranslation('FORMVIEW.TEXT_INPUT_LABEL', {
        en:'Text input',
        nl:'Tekst invoer'
    })

    createTranslation('FORMVIEW.DISABLED_INPUT', {
        en:'Disabled input',
        nl:'Geblokkeerd invoer'
    })

    createTranslation('FORMVIEW.DISABLED_INPUT_DEFAULT_VALUE', {
        en:'Default value',
        nl:'Standaard waarde'
    })

    createTranslation('FORMVIEW.NORMAL_INPUT', {
        en:'Normal input',
        nl:'Normaal invoer'
    })

    createTranslation('FORMVIEW.PASSWORD_INPUT_LABEL', {
        en:'Password input',
        nl:'Wachtwoord invoer'
    })

    createTranslation('FORMVIEW.PASSWORD_INPUT', {
        en:'Password input',
        nl:'Wachtwoord invoer'
    })

    createTranslation('FORMVIEW.PASSWORD_TOGGLE_INPUT', {
        en:'Password input with privacy toggle',
        nl:'Wachtwoord invoer met privacy schakelaar'
    })

    createTranslation('FORMVIEW.CHECKBOX_LABEL', {
        en:'Checkbox',
        nl:'Checkbox'
    })

    createTranslation('FORMVIEW.CHECKBOX_NORMAL', {
        en:'Normal',
        nl:'Normaal'
    })

    createTranslation('FORMVIEW.CHECKBOX_SELECTED', {
        en:'Selected',
        nl:'Geselecteerd'
    })

    createTranslation('FORMVIEW.CHECKBOX_DISABLED', {
        en:'Disabled',
        nl:'Geblokkeerd'
    })

    createTranslation('FORMVIEW.SELECT_LABEL', {
        en:'Select',
        nl:'Select'
    })

    createTranslation('FORMVIEW.SELECT_EXAMPLE', {
        en:'Use Select to choose from a list of options',
        nl:'Gebruik Select om te kiezen uit een lijst met opties'
    })

    createTranslation('FORMVIEW.OPTION_1', {
        en:'Option 1',
        nl:'Optie 1'
    })

    createTranslation('FORMVIEW.OPTION_2', {
        en:'Option 2',
        nl:'Optie 2'
    })

    createTranslation('FORMVIEW.OPTION_3', {
        en:'Option 3',
        nl:'Optie 3'
    })

    createTranslation('FORMVIEW.DATE_LABEL', {
        en:'Date',
        nl:'Datum'
    })

    createTranslation('FORMVIEW.DATEPICKER_EXAMPLE', {
        en:'Select a date',
        nl:'Selecteer een datum'
    })

    createTranslation('FORMVIEW.TIME_LABEL', {
        en:'Time',
        nl:'Tijd'
    })

    createTranslation('FORMVIEW.TIMEPICKER_EXAMPLE', {
        en:'Select a time',
        nl:'Selecteer een tijd'
    })

    createTranslation('FORMVIEW.DATETIME_LABEL', {
        en:'Date & time',
        nl:'Datum & tijd'
    })

    createTranslation('FORMVIEW.DATETIME_PICKER_EXAMPLE', {
        en:'Select a date and time',
        nl:'Selecteer een datum en tijd'
    })

    createTranslation('FORMVIEW.RADIO_LABEL', {
        en:'Radiobutton',
        nl:'Radiobutton'
    })

    createTranslation('FORMVIEW.RADIO_NORMAL', {
        en:'Normal',
        nl:'Normaal'
    })

    createTranslation('FORMVIEW.RADIO_SELECTED', {
        en:'Selected',
        nl:'Geselecteerd'
    })

    createTranslation('FORMVIEW.RADIO_DISABLED', {
        en:'Disabled',
        nl:'Geblokkeerd'
    })

    createTranslation('FORMVIEW.TEXTAREA_LABEL', {
        en:'Textarea',
        nl:'Tekstvlak'
    })

    createTranslation('FORMVIEW.TEXTAREA_EXAMPLE', {
        en:'Write something in the textarea',
        nl:'Typ iets in het tekstvlak'
    })

    createTranslation('FORMVIEW.DATALIST_LABEL', {
        en:'Datalist',
        nl:'Data lijst'
    })

    createTranslation('FORMVIEW.DATALIST_EXAMPLE', {
        en:'Pick an option from the datalist',
        nl:'Kies een optie uit de data lijst'
    })

    function onSubmit(data){

        console.log(data)

    }

    const defaultValues = {
        disabledInput:applyTranslation('FORMVIEW.DISABLED_INPUT_DEFAULT_VALUE'),
        normalInput:applyTranslation('FORMVIEW.DISABLED_INPUT_DEFAULT_VALUE'),
        datePickerInput:'2022-08-05',
        timePickerInput:'22:15',
        dateTimePickerInput:'2022-08-05T01:50',
        textarea:`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33  of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, hasRole, applyTranslation })}
            title={applyTranslation('FORM')}
            controls={<Controls />}
            >
            <Card>
                {applyTranslation('FORMVIEW.introMessage')}
            </Card>
            <Card>
                <Form
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                    >
                    <Label>
                        {applyTranslation('FORMVIEW.TEXT_INPUT_LABEL')}
                    </Label>
                    <Input
                        label={applyTranslation('FORMVIEW.DISABLED_INPUT')}
                        name={'disabledInput'}
                        type={'text'}
                        shouldRegister
                        readOnly
                        />
                    <Input
                        label={applyTranslation('FORMVIEW.NORMAL_INPUT')}
                        name={'normalInput'}
                        shouldRegister
                        />
                    <Input
                        label={applyTranslation('FORMVIEW.PASSWORD_INPUT')}
                        name={'newPassword'}
                        type={'password'}
                        shouldRegister
                        required
                        />
                    <Input
                        label={applyTranslation('FORMVIEW.PASSWORD_TOGGLE_INPUT')}
                        name={'newPasswordRepeat'}
                        type={'password'}
                        shouldRegister
                        passwordToggle
                        required
                        />
                    <Label>
                        {applyTranslation('FORMVIEW.CHECKBOX_LABEL')}
                    </Label>
                    <Checkbox
                        label={applyTranslation('FORMVIEW.CHECKBOX_LABEL')}
                        name={'checkboxExample'}
                        shouldRegister
                        options={[
                            {
                                name:applyTranslation('FORMVIEW.CHECKBOX_NORMAL'),
                                value:'normal',
                                checked:false,
                            },{
                                name:applyTranslation('FORMVIEW.CHECKBOX_SELECTED'),
                                value:'selected',
                                checked:true,
                            },{
                                name:applyTranslation('FORMVIEW.CHECKBOX_DISABLED'),
                                value:'disabled normal',
                                disabled:true,
                            }
                        ]}
                        />
                    <Label>
                        {applyTranslation('FORMVIEW.SELECT_LABEL')}
                    </Label>
                    <Select
                        name={'selectExample'}
                        label={applyTranslation('FORMVIEW.SELECT_EXAMPLE')}
                        shouldRegister
                        options={[
                            {
                                name:applyTranslation('FORMVIEW.OPTION_1'),
                                value:'firstOption',
                            }, {
                                name:applyTranslation('FORMVIEW.OPTION_2'),
                                value:'secondOption',
                            }, {
                                name:applyTranslation('FORMVIEW.OPTION_3'),
                                value:'thirdOption'
                            },
                        ]}
                        defaultValue={{
                            value:'firstOption'
                        }}
                        />
                    <Label>
                        {applyTranslation('FORMVIEW.RADIO_LABEL')}
                    </Label>
                    <Radio
                        name={'radioExample'}
                        label={applyTranslation('FORMVIEW.RADIO_LABEL')}
                        shouldRegister
                        options={[
                            {
                                name:applyTranslation('FORMVIEW.RADIO_NORMAL'),
                                value:'normal',
                            },{
                                name:applyTranslation('FORMVIEW.RADIO_SELECTED'),
                                value:'selected',
                                checked:true,
                            },{
                                name:applyTranslation('FORMVIEW.RADIO_DISABLED'),
                                value:'disabled normal',
                                disabled:true,
                            },
                        ]}
                        />
                    <Label>
                        {applyTranslation('FORMVIEW.DATE_LABEL')}
                    </Label>
                    <Input
                        label={applyTranslation('FORMVIEW.DATEPICKER_EXAMPLE')}
                        name={'datePickerInput'}
                        type={'date'}
                        shouldRegister
                        />
                    <Label>
                        {applyTranslation('FORMVIEW.TIME_LABEL')}
                    </Label>
                    <Input
                        label={applyTranslation('FORMVIEW.TIMEPICKER_EXAMPLE')}
                        name={'timePickerInput'}
                        type={'time'}
                        shouldRegister
                        />
                    <Label>
                        {applyTranslation('FORMVIEW.DATETIME_LABEL')}
                    </Label>
                    <Input
                        label={applyTranslation('FORMVIEW.DATETIME_PICKER_EXAMPLE')}
                        name={'dateTimePickerInput'}
                        type={'datetime-local'}
                        shouldRegister
                        />
                    <Label>
                        {applyTranslation('FORMVIEW.TEXTAREA_LABEL')}
                    </Label>
                    <Textarea
                        label={applyTranslation('FORMVIEW.TEXTAREA_EXAMPLE')}
                        name={'textarea'}
                        rows={8}
                        shouldRegister
                        />
                    <Label>
                        {applyTranslation('FORMVIEW.DATALIST_LABEL')}
                    </Label>
                    <Datalist
                        label={applyTranslation('FORMVIEW.DATALIST_EXAMPLE')}
                        name={'datalistExample'}
                        shouldRegister
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
                    <Label>
                        {applyTranslation('FORMVIEW.MULTIINPUT_LABEL')}
                    </Label>
                    <MultipleInput
                        name={'multiInputTest'}
                        shouldRegister
                        >
                        <Input
                            name={'input1'}
                            label={'Input 1'}
                            type={'text'}
                            />
                        <Input
                            name={'input2'}
                            label={'Input 2'}
                            type={'text'}
                            required
                            />
                        <Textarea
                            name={'textarea'}
                            label={'Textarea'}
                            />
                    </MultipleInput>
                </Form>
            </Card>
        </Layout>
    )
}
