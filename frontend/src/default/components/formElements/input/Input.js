import { useState, useContext } from 'react'

// import { LanguageContext } from '../../../contexts/LanguageContext'

import { createStyle } from '../../../utils/createStyle'

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'

import styles from './Input.module.css'

export default function Input(attributes){

    // const { applyTranslation, createTranslation } = useContext(LanguageContext)

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

    // createTranslation('InputComponent.required', {
    //     en:'required',
    //     nl:'verplicht'
    // })

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
                    {
                        rules?.required && (
                            <div className={styles.required}>
                                <BsDot />
                            </div>
                        )
                    }
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
