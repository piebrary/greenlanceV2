import { createStyle } from '../../../utils/createStyle'

import styles from './InputText.module.css'

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
        rules,
        register,
        errors,
    } = attributes

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
                        type={'text'}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        readOnly={readOnly}
                        {...reg}/>
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
