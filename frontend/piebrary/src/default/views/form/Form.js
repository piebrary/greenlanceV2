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

import { menuitems } from '../../assets/js/menu/items'

import { filterStyles } from '../../utils/filterStyles'

import styles from './Form.module.css'

export default function FormView(){

    const { translate, addTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()

    addTranslation('FormView.introMessage', {
        en:'The form component can be used to quickly build forms. It supports all normal form elements and provides validations and error messages.',
        nl:'De Formulier module kan gebruikt worden om snel en eenvoudig formulieren op te bouwen. Alle gangbare Formulier elementen kunnen gebruikt worden en de module biedt ook validering and foutmeldingen.'
    })

    addTranslation('FormView.INPUT_LABEL', {
        en:'Input',
        nl:'Invoer'
    })

    addTranslation('FormView.DISABLED_INPUT', {
        en:'Disabled input',
        nl:'Geblokkeerd invoer'
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
        nl:'Selectievakjes'
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

    function onSubmit(data){

        alert(data)

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
                        />
                    <Input
                        label={translate('FormView.PASSWORD_TOGGLE_INPUT')}
                        name={'passwordToggleInput'}
                        type={'password'}
                        hideToggle={true}
                        register={register}
                        errors={errors}
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
