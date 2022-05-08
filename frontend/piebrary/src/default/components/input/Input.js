import { useState } from 'react'

import { generateStyles } from '../../utils/generateStyles'

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'

import styles from './Input.module.css'

export default function Input({ customStyles, label, name, type, placeholder, readOnly, defaultValue, onChange, hideToggle, rules, register, errors }){

    const [isHidden, setIsHidden] = useState(true)

    const reg = register && register(name, rules)

    return (
        <div className={generateStyles([styles, customStyles], 'container')}>
            {
                label && (
                    <div className={generateStyles([styles, customStyles], 'label')}>
                        {label}
                    </div>
                )
            }
            <div className={generateStyles([styles, customStyles], 'inputContainer')}>
                <div className={generateStyles([styles, customStyles], 'inputField')}>
                    <input
                        className={generateStyles([styles, customStyles], 'input')}
                        id={name}
                        type={isHidden && type === 'password' ? 'password' : 'text'}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        readOnly={readOnly}
                        {...reg}/>
                    {
                        hideToggle && (
                            <div
                                className={generateStyles([styles, customStyles], 'hideToggle')}
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
                    <span className={generateStyles([styles, customStyles], 'errorMessage')}>
                        {errors[name].message}
                    </span>
                )}
            </div>
        </div>
    )

}
