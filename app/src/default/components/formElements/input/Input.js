import { useState } from 'react'

import get from 'lodash/get'

import ErrorMessage from'../errorMessage/ErrorMessage'
import Title from'../title/Title'

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
        onBlur,
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
        required,
    } = attributes

    const [isHidden, setIsHidden] = useState(true)

    const reg = register && register(name, { onChange, ...rules })

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

    return (
        <div
            className={createStyle([styles, customStyles], 'container')}
            >
            <Title
                title={label}
                required={!readOnly && required}
                />
            <div className={createStyle([styles, customStyles], 'inputContainer')}>
                <div className={createStyle([styles, customStyles], 'inputField')}>
                    <input
                        className={[createStyle([styles, customStyles], 'input'), isPicker && styles.isPicker || ''].join(' ')}
                        id={name}
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
                        onClick={() => isPicker && !readOnly && document.getElementById(name).showPicker() }
                        onBlur={onBlur}
                        onChange={onChange}
                        step={step || 'any'}
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
            </div>
            {
                reg
                && errors
                && get(errors, name)
                && <ErrorMessage
                        errors={get(errors, name)}
                        />
            }
        </div>
    )

}
