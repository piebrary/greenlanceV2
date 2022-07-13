import { useState, useContext, useEffect } from 'react'

import { useForm, useFieldArray } from "react-hook-form"

import { LanguageContext } from '../../../../default/contexts/LanguageContext'

import Label from '../../label/Label'

import { applyStyles } from '../../../utils/applyStyles'
import { createStyle } from '../../../utils/createStyle'
import hasDuplicates from '../../../utils/hasDuplicates'

import { ImBin } from 'react-icons/im'
import { AiOutlinePlus } from 'react-icons/ai'

import styles from './EmailInput.module.css'

export default function EmailInput(attributes){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)

    const {
        customStyles,
        defaultValue,
        readOnly,
        name,
        label,
        register,
        unregister,
        errors,
        getValues,
        control,
        reset,
        expandable = true,
        reduceable = true,
        allowNoValue = false
    } = attributes

    const { fields, append, prepend, remove, swap, move, insert, replace } = useFieldArray({
        control,
        name: name,
    })

    useEffect(() => {

        reset()

    }, [])

    const labelRules = {
        validate:{
            notEmpty: value => {

                if(value === '') return '- Empty label is not allowed'

                return true

            },
        }
    }

    const emailRules = {
        validate:{
            notEmpty: value => {

                if(value === '') return '- Empty email is not allowed'

                return true

            },
            validEmail: value => {

                if(value.includes('@') && value.includes('.')) return true

                return '- Please enter a valid emailaddress'

            }
        }
    }

    let Input

    try { Input = require('../../../../custom/components/formElements/input/Input').default } catch { Input = require('../../../../default/components/formElements/input/Input').default }

    return (
        <div
            className={styles.container}
            >
            {label}
            {
                fields.map((e, i) => {

                    return (
                        <div
                            key={'emailContainer' + i}
                            >
                            <div
                                className={styles.emailContainer}
                                >
                                <div className={styles.label}>
                                    <Input
                                        key={'label' + i}
                                        name={`${name}[${i}].label`}
                                        placeholder={applyTranslation('LABEL')}
                                        defaultValue={e.label}
                                        customStyles={applyStyles([styles, customStyles], ['input', 'emailInput'])}
                                        readOnly={readOnly}
                                        register={register}
                                        errors={errors}
                                        rules={labelRules}
                                        />
                                </div>
                                <div className={styles.email}>
                                    <Input
                                        key={'email' + i}
                                        name={`${name}[${i}].email`}
                                        placeholder={applyTranslation('EMAIL')}
                                        defaultValue={e.email}
                                        customStyles={applyStyles([styles, customStyles], ['input', 'emailInput'])}
                                        readOnly={readOnly}
                                        register={register}
                                        errors={errors}
                                        rules={emailRules}
                                        />
                                </div>
                                {
                                    (
                                        (i > 0 && !allowNoValue)
                                        || allowNoValue
                                    )
                                    && !readOnly
                                    && reduceable
                                    && (
                                        <div
                                            className={styles.delete}
                                            onClick={() => {

                                                remove(i)

                                            }}
                                            >
                                            <ImBin size={20}/>
                                        </div>
                                    )
                                }
                            </div>
                            {register && errors[name] && errors[name][i] && errors[name][i]['label'] && (
                                <span className={createStyle([styles, customStyles], 'errorMessage')}>
                                    {errors[name][i]['label'].message}
                                </span>
                            )}
                            {register && errors[name] && errors[name][i] && errors[name][i]['email'] &&(
                                <span className={createStyle([styles, customStyles], 'errorMessage')}>
                                    {errors[name][i]['email'].message}
                                </span>
                            )}
                        </div>
                    )

                })
            }
            {
                !readOnly && expandable && (
                    <div
                        className={styles.addBtn}
                        onClick={() => {

                            append({ label:'', email:'' })

                        }}
                        >
                        Add emailaddress
                    </div>
                )
            }
        </div>
    )

}
