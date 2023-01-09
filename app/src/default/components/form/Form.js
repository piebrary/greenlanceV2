import React, { useEffect, useContext } from 'react'

import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// import { ValidationContext } from '../../../default/contexts/ValidationContext'
import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import Button from '../../../default/components/button/Button'

import { createStyle } from '../../utils/createStyle'
import { applyStyles } from '../../utils/applyStyles'

import styles from './Form.module.css'

export default function Form(attributes){

    const { authState } = useContext(AuthenticationContext)
    const { applyTranslation } = useContext(LanguageContext)

    let {
        customStyles,
        children,
        onSubmit = undefined,
        defaultValues,
        validationSchema,
        submitLabel = authState === 'success' && applyTranslation('SUBMIT') || 'Submit',
        resetLabel = authState === 'success' && applyTranslation('RESET') || 'Reset',
        disableReset
    } = attributes

    // make sure children is always an array, because when one child is passed react jsut passed the child as react object
    children = !Array.isArray(children) && [children] || children

    let amountOfReadOnlys = 0,
        amountOfRegisteredFields = 0

    const {
        register,
        handleSubmit,
        reset,
        control,
        getValues,
        formState:{
            errors,
            dirtyFields
        },
    } = useForm({
        defaultValues,
        resolver:validationSchema && yupResolver(validationSchema, { abortEarly:false }),
        criteriaMode: 'all',
        mode: 'onTouched',
    })

    useEffect(() => {

        reset(defaultValues)

    }, [defaultValues])

    const onCustomSubmit = data => {

        onSubmit(data)

    }

    const handleReset = event => {

        event && event.preventDefault()

        reset()


    }

    return (
        <form
            onSubmit={handleSubmit(onCustomSubmit)}
            className={createStyle([styles, customStyles], 'container')}
            >
            {Object.keys(errors).length > 0 && process.env.REACT_APP_ENVIRONMENT === 'development' && console.log(errors)}
            {
                children.map((child, i) => {

                    if(child?.props?.shouldRegister){

                        const key = child.props.name
                        const shouldRegister = child.props.shouldRegister
                        const defaultValue = shouldRegister && defaultValues?.[child.props.name]

                        amountOfRegisteredFields++

                        if(child.props.readOnly){

                            amountOfReadOnlys++

                        }

                        return React.cloneElement(
                            child,
                            {
                                key,
                                defaultValue,
                                errors,
                                control:shouldRegister && control,
                                reset:shouldRegister && reset,
                                register:shouldRegister && register,
                                getValues,
                            }
                        )

                    }

                    if(!child?.props?.register){

                        return child

                    }

                })
            }
            {
                onSubmit && amountOfRegisteredFields > amountOfReadOnlys && (
                    <div
                        className={createStyle([styles, customStyles], 'btnContainer')}
                        >
                        <Button
                            label={submitLabel}
                            type={'submit'}
                            customStyles={applyStyles([styles, customStyles], 'submitBtn')}
                            />
                        {
                            disableReset !== true && (
                                <Button
                                    label={resetLabel}
                                    onClick={handleReset}
                                    customStyles={applyStyles([styles, customStyles], 'resetBtn')}
                                    />
                            )
                        }
                    </div>
                )
            }
        </form>
    )

}
