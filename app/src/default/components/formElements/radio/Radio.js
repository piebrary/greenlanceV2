import ErrorMessage from'../errorMessage/ErrorMessage'
import Title from'../title/Title'

import { createStyle } from '../../../utils/createStyle'

import styles from './Radio.module.css'

export default function Radio(attributes){

    const {
        customStyles,
        label,
        name,
        options,
        onClick,
        onChange,
        register = () => {},
        errors,
        rules,
        readOnly,
        required,
    } = attributes

    const reg = register && register(name)

    return options && (
        <div className={createStyle([styles, customStyles], 'container')}>
            <Title
                title={label}
                required={!readOnly && required}
                />
            <div className={createStyle([styles, customStyles], 'radios')}>
                {
                    options.map(o => {

                        return (
                            <label
                                className={`${ o.disabled ? createStyle([styles, customStyles], 'radioPairDisabled') : createStyle([styles, customStyles], 'radioPair')}`}
                                key={o.name}>
                                <input
                                    type='radio'
                                    className={createStyle([styles, customStyles], 'radio')}
                                    onClick={event => onClick && onClick(event)}
                                    defaultChecked={o.checked}
                                    disabled={o.disabled}
                                    value={o.name}
                                    onChange={onChange}
                                    {...register(name, rules)}
                                    />
                                {o.label}
                            </label>
                        )

                    })
                }
            </div>
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
