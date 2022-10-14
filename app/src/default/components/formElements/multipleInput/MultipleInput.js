import React, { useEffect } from 'react'

import { useForm, useFieldArray } from 'react-hook-form'

import Button from '../../../../default/components/button/Button'

import { createStyle } from '../../../../default/utils/createStyle'
import { applyStyles } from '../../../../default/utils/applyStyles'

import styles from './MultipleInput.module.css'

import { ImBin } from 'react-icons/im'

import { GrAdd } from 'react-icons/gr'

export default function MultipleInput(attributes){

    let {
        customStyles,
        children,
        control,
        name,
        reset,
        register,
        errors,
        rules,
        allowRemove = true,
        allowRemoveAll = true,
        allowAppend = true,
        allowPrepend = true,
        // minItems = 5,
        // maxItems,
    } = attributes

    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace,
    } = useFieldArray({
        control,
        name:'multiInputTest'
    })

    // make sure children is always an array, because when one child is passed react jsut passed the child as react object
    children = !Array.isArray(children) && [children] || children

    // if(minItems && minItems > fields.length){
    //     for(let i = 0; i < minItems - fields.length; i++){
    //         console.log('appending')
    //         onAppend()
    //     }
    // }
    //
    // console.log(fields)

    function onAppend(event){

        event && event.preventDefault()

        const newInputGroup = children
            .map(child => child.props.name)                                     // get array of defaultValues prop names
            .reduce((a, v) => {
                return { ...a , [v]: '' }                                       // return new inputGroup with defaultValue undefined
            }, {})

        append(newInputGroup)

    }

    function onRemove(event, index){

        event && event.preventDefault()

        remove(index)

    }

    function onRemoveAll(event){

        event && event.preventDefault()

        remove()

    }

    function onPrepend(event){

        event && event.preventDefault()

        const newInputGroup = children
            .map(child => child.props.name)                                     // get array of defaultValues prop names
            .reduce((a, v) => {
                return { [v]: '', ...a }                                        // return new inputGroup with defaultValue undefined
            }, {})

        prepend(newInputGroup)

    }

    return (
        <>
            {
                fields.length === 0 && (
                    <div
                        className={createStyle([styles, customStyles], 'topControlsContainer')}
                        style={{
                            margin: '0px 40px 0px 40px',
                            padding: '6px 30px 6px 30px',
                            borderRadius: 'var(--componentInputContainerBorderRadius)',
                        }}
                        >
                        <div
                            className={createStyle([styles, customStyles], 'controlButton')}
                            onClick={event => onAppend(event)}
                            title={'Add'}
                            >
                            <GrAdd />
                        </div>
                    </div>
                )
            }
            {
                fields.length > 0
                && (
                    allowPrepend
                ) && (
                    <div
                        className={createStyle([styles, customStyles], 'topControlsContainer')}
                        >
                        {
                            allowPrepend && (
                                <div
                                    className={createStyle([styles, customStyles], 'controlButton')}
                                    onClick={event => onPrepend(event)}
                                    title={'Prepend'}
                                    >
                                    <GrAdd />
                                </div>
                            )
                        }
                    </div>
                )
            }
            {
                fields.map((field, i) => {

                    const key = field.id

                    const newChildren = children.map(child => {

                        const childName = `${name}[${i}].${child.props.name}`
                        const defaultValue = fields[i][child.props.name]
                        const elementCustomStyles = applyStyles([styles, customStyles, child.props.customStyles], ['removeElementContainerStyle', 'elementCustomStyles'])

                        return React.cloneElement(
                            child,
                            {
                                name:childName,
                                key:childName,
                                defaultValue,
                                register,
                                control,
                                reset,
                                errors:errors && errors[name] && errors[name][i] && { [childName]:errors[name][i][child.props.name] },
                                customStyles:elementCustomStyles
                            }
                        )
                    })

                    return (
                        <div
                            key={key}
                            className={createStyle([styles, customStyles], 'container')}
                            >
                            <div
                                className={createStyle([styles, customStyles], 'formElements')}
                                >
                                {newChildren}
                            </div>
                            {
                                allowRemove && (
                                    <div
                                        className={createStyle([styles, customStyles], 'removeOneButton')}
                                        onClick={event => onRemove(event, i)}
                                        title={'Remove'}
                                        >
                                        <ImBin />
                                    </div>
                                )
                            }
                        </div>
                    )

                })
            }
            {
                fields.length > 0
                && (
                    allowAppend
                    || allowRemoveAll
                ) && (
                    <div
                        className={createStyle([styles, customStyles], 'bottomControlsContainer')}
                        >
                        {
                            allowAppend && (
                                <div
                                    className={createStyle([styles, customStyles], 'controlButton')}
                                    onClick={event => onAppend(event)}
                                    title={'Append'}
                                    >
                                    <GrAdd />
                                </div>
                            )
                        }
                        {
                            allowRemoveAll && (
                                <div
                                    className={createStyle([styles, customStyles], 'removeButton')}
                                    onClick={event => onRemoveAll(event)}
                                    title={'Remove all'}
                                    >
                                    <ImBin />
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )

}
