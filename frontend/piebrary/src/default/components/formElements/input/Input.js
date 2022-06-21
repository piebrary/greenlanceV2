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
        rules,
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
    } = attributes

    const [isHidden, setIsHidden] = useState(true)

    const reg = register && register(name, rules)

    const isPicker = (
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
        <div className={createStyle([styles, customStyles], 'container')}>
            {
                label && (
                    <label
                        htmlFor={name}
                        className={createStyle([styles, customStyles], 'label')}
                        >
                        {label}
                    </label>
                )
            }
            <div className={createStyle([styles, customStyles], 'inputContainer')}>
                <div className={createStyle([styles, customStyles], 'inputField')}>
                    <input
                        className={[createStyle([styles, customStyles], 'input'), isPicker && styles.isPicker].join(' ')}
                        id={name}
                        type={type !== 'password' ? type : type === 'password' && !isHidden ? 'test' : 'password'}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        readOnly={readOnly}
                        min={min}
                        max={max}
                        value={value}
                        maxLength={maxLength}
                        multiple={multiple}
                        pattern={pattern}
                        step={step}
                        autoFocus={autoFocus}
                        autoComplete={autoComplete}
                        onClick={() => document.getElementById(name).showPicker() }
                        {...reg}/>
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
                {reg && errors[name] && (
                    <span className={createStyle([styles, customStyles], 'errorMessage')}>
                        {errors[name].message}
                    </span>
                )}
            </div>
        </div>
    )

}
