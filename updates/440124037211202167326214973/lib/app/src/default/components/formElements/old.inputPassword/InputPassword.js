import {useState } from 'react'

import { createStyle } from '../../../utils/createStyle'

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'

import styles from './InputPassword.module.css'

export default function InputText(attributes){

    const {
        customStyles,
        label,
        name,
        placeholder,
        readOnly,
        onchange,
        size,
        disabled,
        max,
        min,
        maxlength,
        required,
        defaultValue,
        toggle,
        rules,
        register,
        errors,
    } = attributes

    const [isHidden, setIsHidden] = useState(true)

    const reg = register && register(name, rules)

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
                        className={createStyle([styles, customStyles], 'input')}
                        id={name}
                        type={isHidden ? 'password' : 'text'}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        readOnly={readOnly}
                        {...reg}/>
                    {
                        toggle && (
                            <div
                                className={createStyle([styles, customStyles], 'toggle')}
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
