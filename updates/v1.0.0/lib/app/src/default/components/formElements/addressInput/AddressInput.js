import { useState, useContext, useEffect } from 'react'

import { useForm, useFieldArray } from 'react-hook-form'

import { LanguageContext } from '../../../../default/contexts/LanguageContext'

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

import styles from './AddressInput.module.css'

export default function AddressInput(attributes){

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
            className={styles.container}
            >
            {
                !readOnly && (
                    <Title
                        title={label}
                        required={required}
                        />
                )
            }
            <div
                key={'addressContainer'}
                className={createStyle([styles, customStyles], ['addressContainer'])}
                >
                <Grid customStyles={applyStyles([styles, customStyles], ['addressGrid'])}>
                    <Input
                        name={name + '.label'}
                        placeholder={applyTranslation('LABEL')}
                        defaultValue={defaultValue?.label}
                        customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputLabel'])}
                        readOnly={readOnly}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        name={name + '.street'}
                        placeholder={applyTranslation('STREET')}
                        defaultValue={defaultValue?.street}
                        customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputStreet'])}
                        readOnly={readOnly}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        name={name + '.number'}
                        placeholder={applyTranslation('NUMBER')}
                        defaultValue={defaultValue?.number}
                        customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputNumber'])}
                        readOnly={readOnly}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        name={name + '.zipCode'}
                        placeholder={applyTranslation('ZIPCODE')}
                        defaultValue={defaultValue?.zipCode}
                        customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputZipCode'])}
                        readOnly={readOnly}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        name={name + '.city'}
                        placeholder={applyTranslation('CITY')}
                        defaultValue={defaultValue?.city}
                        customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputCity'])}
                        readOnly={readOnly}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        name={name + '.province'}
                        placeholder={applyTranslation('PROVINCE')}
                        defaultValue={defaultValue?.province}
                        customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputProvince'])}
                        readOnly={readOnly}
                        register={register}
                        errors={errors}
                        />
                    <Input
                        name={name + '.country'}
                        placeholder={applyTranslation('COUNTRY')}
                        defaultValue={defaultValue?.country}
                        customStyles={applyStyles([styles, customStyles], ['input', 'addressInput', 'addressInputCountry'])}
                        readOnly={readOnly}
                        register={register}
                        errors={errors}
                        />
                </Grid>
            </div>
        </div>
    )

}
