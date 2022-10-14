import React, { useEffect } from 'react'

import { useForm, useFieldArray } from 'react-hook-form'

import Button from '../../../default/components/button/Button'

import { createStyle } from '../../utils/createStyle'

import styles from './Form.module.css'

export default function Form(attributes){

    let {
        customStyles,
        children,
        onSubmit,
        defaultValues,
        rules,
    } = attributes

    // make sure children is always an array, because when one child is passed react jsut passed the child as react object
    children = !Array.isArray(children) && [children] || children

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: {
            errors
        },
    } = useForm({
        defaultValues
    })

    const onCustomSubmit = handleSubmit(onSubmit)

    const handleReset = event => {

        event && event.preventDefault()

        reset()


    }

    return (
        <form
            onSubmit={onCustomSubmit}
            className={createStyle([styles, customStyles], 'container')}>
            {
                children.map(child => {

                    const key = child.props.name
                    const defaultValue = defaultValues[child.props.name]

                    return React.cloneElement(
                        child,
                        {
                            register,
                            errors,
                            key,
                            defaultValue,
                            control,
                            reset,
                        }
                    )

                })
            }
            <Button
                label={'Submit'}
                onClick={onCustomSubmit}
                />
            <Button
                label={'Reset'}
                onClick={handleReset}
                />
        </form>
    )

}
