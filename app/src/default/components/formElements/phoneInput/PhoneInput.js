import { useState, useContext, useEffect } from 'react'

import { useForm, useFieldArray } from 'react-hook-form'

import { LanguageContext } from '../../../../default/contexts/LanguageContext'

import ErrorMessage from'../errorMessage/ErrorMessage'
import Label from '../../label/Label'
import Grid from '../../grid/Grid'
import RequiredLabel from'../requiredLabel/RequiredLabel'
import Title from'../title/Title'

import { applyStyles } from '../../../utils/applyStyles'
import { createStyle } from '../../../utils/createStyle'
import { hasDuplicates } from '../../../utils/hasDuplicates'
import { deepCopy } from '../../../utils/deepCopy'

import { ImBin } from 'react-icons/im'
import { AiOutlinePlus } from 'react-icons/ai'

import styles from './PhoneInput.module.css'

export default function PhoneInput(attributes){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)

    const {
        customStyles,
        defaultValue = {},
        readOnly,
        name,
        label,
        register,
        unregister,
        errors,
        getValues,
        control,
        reset,
        required,
    } = attributes

    let Input

    try {
        Input = require('../../../../custom/components/formElements/input/Input').default
    } catch {
        Input = require('../../../../default/components/formElements/input/Input').default
    }

    return (
        <div
            className={createStyle([styles, customStyles], 'container')}
            >
            <Title
                title={label}
                required={!readOnly && required}
                />
            <div
                key={'phoneContainer'}
                className={createStyle([styles, customStyles], ['phoneContainer'])}
                >
                <Grid customStyles={applyStyles([styles, customStyles], ['phoneGrid'])}>
                    <Input
                        name={name + '.label'}
                        placeholder={applyTranslation('LABEL')}
                        defaultValue={defaultValue?.label}
                        customStyles={applyStyles([styles, customStyles], ['input', 'phoneInput', 'phoneInputLabel'])}
                        readOnly={readOnly}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        name={name + '.phone'}
                        type={'tel'}
                        placeholder={applyTranslation('PHONE')}
                        defaultValue={defaultValue?.phone}
                        customStyles={applyStyles([styles, customStyles], ['input', 'phoneInput', 'phoneInputStreet'])}
                        readOnly={readOnly}
                        register={register}
                        errors={errors}
                        />

                </Grid>
            </div>
            {
                register
                && errors
                && errors[name]
                && errors[name].label
                && <ErrorMessage
                    errors={errors[name].label}
                    />
            }
            {
                register
                && errors
                && errors[name]
                && errors[name].phone
                && <ErrorMessage
                    errors={errors[name].phone}
                    />
            }

        </div>
    )

}
