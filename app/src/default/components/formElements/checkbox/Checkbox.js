import ErrorMessage from'../errorMessage/ErrorMessage'
import Title from'../title/Title'

import { createStyle } from '../../../utils/createStyle'

import styles from './Checkbox.module.css'

export default function Checkbox(attributes){

    const {
        customStyles,
        label,
        name,
        options,
        onClick,
        register,
        errors,
        shouldRegister,
        required,
        rules = {},
        readOnly,
    } = attributes

    return options && (
        <div className={createStyle([styles, customStyles], 'container')}>
            <Title
                title={label}
                required={!readOnly && required}
                />
            <div className={createStyle([styles, customStyles], 'checkboxes')}>
                {
                    options.map((o, i) => {

                        return (
                            <label
                                className={`${ o.disabled ? createStyle([styles, customStyles], 'checkboxPairDisabled') : createStyle([styles, customStyles], 'checkboxPair')}`}
                                key={o.name}>
                                <input
                                    type='checkbox'
                                    className={createStyle([styles, customStyles], 'checkbox')}
                                    onClick={event => onClick && onClick(event)}
                                    defaultChecked={o.checked}
                                    disabled={o.disabled}
                                    value={o.name}
                                    {...register(`${name}.${o.name}`, rules)}
                                    />
                                {o.label}
                            </label>
                        )

                    })
                }
            </div>
            {
                register
                && errors
                && errors[name]
                && <ErrorMessage
                    errors={errors[name]}
                    />
            }
        </div>
    )

}
