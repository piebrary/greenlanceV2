import { useState } from 'react'

import { createStyle } from '../../../utils/createStyle'

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'

import styles from './Input.module.css'

export default function Input(attributes){

    const {
        customStyles,
        label,
        name,
        type,
        placeholder,
        readOnly,
        defaultValue,
        onChange,
        passwordToggle,
        rules = {},
        register,
        errors,
        min,
        max,
        value,
        maxLength,
        multiple,
        pattern,
        step,
        autoFocus,
        autoComplete,
        required
    } = attributes

    required && (
        rules.required = placeholder && `${placeholder} is required` || 'Required'
    )

    // You can also validate by using
    //     rules.validate = {
    //         required: value => {
    //
    //             return value.length > 0 || placeholder && `${placeholder} is required` || 'Required'
    //
    //         },
    //         minLength: value => {
    //
    //         return value.length < 8 || placeholder && `${placeholder} is to short` || 'Minimal 8 characters'
    //
    //         }
    //     }

    const [isHidden, setIsHidden] = useState(true)

    const reg = register && register(name, rules)

    const isPicker = !readOnly && (
        type === 'color'
        || type === 'date'
        || type === 'datetime-local'
        || type === 'image'
        || type === 'month'
        || type === 'range'
        || type === 'time'
        || type === 'week'
    )

    const randomId = Math.random()

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            {
                label && (
                    <label
                        htmlFor={name + randomId}
                        className={createStyle([styles, customStyles], 'label')}
                        >
                        {label}
                    </label>
                )
            }
            <div className={createStyle([styles, customStyles], 'inputContainer')}>
                <div className={createStyle([styles, customStyles], 'inputField')}>
                    <input
                        className={[createStyle([styles, customStyles], 'input'), isPicker && styles.isPicker || ''].join(' ')}
                        id={name + randomId}
                        type={type !== 'password' ? type : type === 'password' && !isHidden ? 'text' : 'password'}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        value={value}
                        readOnly={readOnly}
                        min={min}
                        max={max}
                        maxLength={maxLength}
                        multiple={multiple}
                        pattern={pattern}
                        step={step}
                        autoFocus={autoFocus}
                        autoComplete={autoComplete}
                        onClick={() => isPicker && !readOnly && document.getElementById(name + randomId).showPicker() }
                        onChange={onChange}
                        {...reg}
                        />
                </div>
                {
                    passwordToggle && (
                        <div
                            className={createStyle([styles, customStyles], 'passwordToggle')}
                            onClick={() => setIsHidden(!isHidden)}>
                            {
                                isHidden && <AiOutlineEyeInvisible size={24} />
                            }
                            {
                                !isHidden && <AiOutlineEye size={24} />
                            }
                        </div>
                    )
                }
                {reg && errors && errors[name] && (
                    <span className={createStyle([styles, customStyles], 'errorMessage')}>
                        {errors[name].message}
                    </span>
                )}
            </div>
        </div>
    )

}
