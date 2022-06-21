import { createStyle } from '../../../utils/createStyle'

import styles from './Textarea.module.css'

export default function Textarea(attributes){

    const {
        customStyles,
        defaultValue,
        label,
        id,
        name,
        rows,
        cols,
        onChange,
        register,
        errors,
        rules,
        readOnly,
    } = attributes

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            {
                label && (
                    <label
                        className={createStyle([styles, customStyles], 'label')}
                        >
                        {label}
                    </label>
                )
            }
            <textarea
                id={name}
                className={createStyle([styles, customStyles], 'textarea')}
                defaultValue={defaultValue?.value}
                {...register(name, rules)}
                onChange={onChange}
                >
                {
                    defaultValue
                }
            </textarea>
        </div>
    )

}
