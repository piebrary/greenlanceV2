import { useState, useContext, useEffect } from 'react'

import { useForm, useFieldArray } from "react-hook-form"

import { LanguageContext } from '../../../../default/contexts/LanguageContext'

import Label from '../../label/Label'
import Grid from '../../grid/Grid'

import { applyStyles } from '../../../utils/applyStyles'
import { createStyle } from '../../../utils/createStyle'
import hasDuplicates from '../../../utils/hasDuplicates'
import { deepCopy } from '../../../utils/deepCopy'

import { ImBin } from 'react-icons/im'
import { AiOutlinePlus } from 'react-icons/ai'

import styles from './AddressInput.module.css'

export default function AddressInput(attributes){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)

    const {
        customStyles,
        defaultValue = [],
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
        allowNoValue = false,
    } = attributes

    const { fields, append, prepend, remove, swap, move, insert, replace } = useFieldArray({
        control,
        name:name,
    })

    useEffect(() => {

        reset()

    }, [])

    const addressRules = {
        validate:{
            notEmpty: value => {

                if(value === '') return '- Empty address is not allowed'

                return true

            },
            validAddress: value => {

                return true

                return '- Please enter a valid address'

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
                            key={'addressContainer' + i}
                            className={createStyle([styles, customStyles], ['addressContainer'])}
                            >
                            <Grid customStyles={applyStyles([styles, customStyles], ['addressGrid'])}>
                                <Input
                                    key={name + i + 'label'}
                                    name={`${name}[${i}].label`}
                                    placeholder={applyTranslation('LABEL')}
                                    defaultValue={e.label}
                                    customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputLabel'])}
                                    readOnly={readOnly}
                                    register={register}
                                    errors={errors}
                                    rules={addressRules}
                                    />
                                {
                                    (
                                        (i > 0 && !allowNoValue)
                                        || allowNoValue
                                    )
                                    && !readOnly
                                    && reduceable
                                    && (
                                        <div
                                            className={createStyle([styles, customStyles], ['delete'])}
                                            onClick={() => {

                                                remove(i)

                                            }}
                                            >
                                            <ImBin size={20}/>
                                        </div>
                                    )
                                }
                                <Input
                                    key={name + i + 'street'}
                                    name={`${name}[${i}].street`}
                                    placeholder={applyTranslation('STREET')}
                                    defaultValue={e.street}
                                    customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputStreet'])}
                                    readOnly={readOnly}
                                    register={register}
                                    errors={errors}
                                    rules={addressRules}
                                    />
                                <Input
                                    key={name + i + 'number'}
                                    name={`${name}[${i}].number`}
                                    placeholder={applyTranslation('NUMBER')}
                                    defaultValue={e.number}
                                    customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputNumber'])}
                                    readOnly={readOnly}
                                    register={register}
                                    errors={errors}
                                    rules={addressRules}
                                    />
                                <Input
                                    key={name + i + 'zipCode'}
                                    name={`${name}[${i}].zipCode`}
                                    placeholder={applyTranslation('ZIPCODE')}
                                    defaultValue={e.zipCode}
                                    customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputZipCode'])}
                                    readOnly={readOnly}
                                    register={register}
                                    errors={errors}
                                    rules={addressRules}
                                    />
                                <Input
                                    key={name + i + 'city'}
                                    name={`${name}[${i}].city`}
                                    placeholder={applyTranslation('CITY')}
                                    defaultValue={e.city}
                                    customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputCity'])}
                                    readOnly={readOnly}
                                    register={register}
                                    errors={errors}
                                    rules={addressRules}
                                    />
                                <Input
                                    key={name + i + 'province'}
                                    name={`${name}[${i}].province`}
                                    placeholder={applyTranslation('PROVINCE')}
                                    defaultValue={e.province}
                                    customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputProvince'])}
                                    readOnly={readOnly}
                                    register={register}
                                    errors={errors}
                                    rules={addressRules}
                                    />
                                <Input
                                    key={name + i + 'country'}
                                    name={`${name}[${i}].country`}
                                    placeholder={applyTranslation('COUNTRY')}
                                    defaultValue={e.country}
                                    customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputCountry'])}
                                    readOnly={readOnly}
                                    register={register}
                                    errors={errors}
                                    rules={addressRules}
                                    />
                            </Grid>
                            {register && errors[`${name}[${i}].label`] && (
                                <span className={createStyle([styles, customStyles], 'errorMessage')}>
                                    {errors[`${name}[${i}].label`].message}
                                </span>
                            )}
                            {register && errors[name] && errors[name][i] && errors[name][i]['address'] &&(
                                <span className={createStyle([styles, customStyles], 'errorMessage')}>
                                    {errors[name][i]['address'].message}
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

                            append({
                                label:'',
                                street:'',
                                number:'',
                                zipCode:'',
                                city:'',
                                province:'',
                                country:''
                            })

                        }}
                        >
                        Add address
                    </div>
                )
            }
        </div>
    )

}
