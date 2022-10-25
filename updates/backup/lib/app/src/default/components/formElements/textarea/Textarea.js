import ErrorMessage from'../errorMessage/ErrorMessage'
import Title from'../title/Title'

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

    const reg = register && register(name, rules)

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            <Title
                title={label}
                required={required}
                />
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
            {
                reg
                && errors
                && errors[name]
                && <ErrorMessage
                    errors={errors[name]}
                    />
            }
        </div>
    )

}
