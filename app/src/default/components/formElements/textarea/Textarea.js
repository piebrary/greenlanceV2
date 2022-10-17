import { createStyle } from '../../../utils/createStyle'

import styles from './Textarea.module.css'

export default function Textarea(attributes){

    const {
        customStyles,
        defaultValue,
        placeholder,
        label,
        id,
        name,
        rows,
        cols,
        onChange,
        register,
        errors,
        rules = {},
        readOnly,
        required,
        shouldRegister,
    } = attributes

    required && (
        rules.required = placeholder && `${placeholder} is required` || 'Required'
    )

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
            <textarea
                id={name}
                className={createStyle([styles, customStyles], 'textarea')}
                defaultValue={defaultValue}
                {...reg}
                onChange={onChange}
                rows={rows}
                cols={cols}
                readOnly={readOnly}
                >
            </textarea>
            {reg && errors && errors[name] && (
                <span className={createStyle([styles, customStyles], 'errorMessage')}>
                    {errors[name].message}
                </span>
            )}
        </div>
    )

}
