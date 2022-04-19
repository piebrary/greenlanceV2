import { useState } from 'react'

import { useForm } from "react-hook-form"

import Button from '../button/Button'
import Checkbox from '../checkbox/Checkbox'
import Date from '../date/Date'
import Input from '../input/Input'
import Select from '../select/Select'
import Textarea from '../textarea/Textarea'
import Time from '../time/Time'

import { generateStyles } from '../../../utils/generateStyles'
import { filterStyles } from '../../../utils/filterStyles'

import styles from './Form.module.css'

export default function Form({ customStyles, logo, title, settings, elements, buttons, onSubmit }){

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    function onReset(event){

        event.preventDefault()

        reset(
            Object.assign(
                ...elements.map(el => {

                    if(el.name){

                        return { [el.name]:el.defaultValue || '' }

                    }

                    return undefined

                })
            )
        )

    }

    return (
        <form
            className={generateStyles([styles, customStyles], 'form')}
            onSubmit={handleSubmit(onSubmit)}>
            <div className={generateStyles([styles, customStyles], 'formheader')}>
                <div className={generateStyles([styles, customStyles], 'title')}>
                    {title}
                </div>
                <div className={generateStyles([styles, customStyles], 'logo')}>
                    {logo}
                </div>
            </div>
            {
                elements && elements.map(el => {

                    const {
                        type,
                        subtype,
                        label,
                        name,
                        defaultValue,
                        submit,
                        placeholder,
                        rules,
                    } = el

                    return (
                        <div
                            key={el.label}
                            className={generateStyles([styles, customStyles], 'formgroup')}>
                            {
                                type === 'input'
                                ? (
                                    <div className={generateStyles([styles, customStyles], 'formgroup')}>
                                        <input
                                            className={generateStyles([styles, customStyles], 'input')}
                                            id={label}
                                            type={subtype}
                                            placeholder={placeholder}
                                            defaultValue={defaultValue}
                                            {...register(name, rules)}/>
                                            {errors[name] && errors[name].type === "required" && <span className={generateStyles([styles, customStyles], 'errorMessage')}>- This is required</span>}
                                            {errors[name] && errors[name].type === "maxLength" && <span className={generateStyles([styles, customStyles], 'errorMessage')}>- Max length exceeded</span>}
                                            {errors[name] && errors[name].type === "minLength" && <span className={generateStyles([styles, customStyles], 'errorMessage')}>- Min length exceeded</span>}
                                            {errors[name] && errors[name].type === "max" && <span className={generateStyles([styles, customStyles], 'errorMessage')}>- Max number exceeded</span>}
                                            {errors[name] && errors[name].type === "min" && <span className={generateStyles([styles, customStyles], 'errorMessage')}>- Min number exceeded</span>}
                                            {errors[name] && errors[name].type === "pattern" && <span className={generateStyles([styles, customStyles], 'errorMessage')}>- False pattern</span>}
                                    </div>
                                )
                                // : type === 'checkbox'
                                // ? (
                                //     <>
                                //         <Checkbox />
                                //     </>
                                // )
                                // : type === 'date'
                                // ? (
                                //     <>
                                //         <Date />
                                //     </>
                                // )
                                // : type === 'select'
                                // ? (
                                //     <>
                                //         <Select />
                                //     </>
                                // )
                                // : type === 'textarea'
                                // ? (
                                //     <>
                                //         <Textarea />
                                //     </>
                                // )
                                // : type === 'time'
                                // ? (
                                //     <>
                                //         <Time />
                                //     </>
                                // )
                                : undefined
                            }
                        </div>
                    )

                })
            }
            <div className={generateStyles([styles, customStyles], 'buttongroup')}>
                {
                    buttons && buttons.map(b => {

                        const {
                            label,
                            subtype
                        } = b

                        return (
                            <Button
                                key={label}
                                customStyles={filterStyles([styles, customStyles], subtype === 'reset' ? 'reset' : 'submit')}
                                label={label}
                                onClick={subtype === 'reset' ? onReset : undefined}/>
                        )

                    })
                }
            </div>
        </form>
    )

}
