import styles from './Radio.module.css'

import { createStyle } from '../../../utils/createStyle'

export default function Radio(attributes){

    const {
        customStyles,
        label,
        name,
        options,
        onClick,
        register,
        errors,
        rules
    } = attributes

    return options && (
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
            <div className={createStyle([styles, customStyles], 'radios')}>
                {
                    options.map(o => {

                        return (
                            <label
                                className={`${ o.disabled ? createStyle([styles, customStyles], 'radioPairDisabled') : createStyle([styles, customStyles], 'radioPair')}`}
                                key={o.name}>
                                <input
                                    type='radio'
                                    name={name}
                                    className={createStyle([styles, customStyles], 'radio')}
                                    onClick={event => onClick && onClick(event)}
                                    defaultChecked={o.checked}
                                    disabled={o.disabled}
                                    value={o.value}
                                    {...register(name, rules)}/>
                                {o.name}
                            </label>
                        )

                    })
                }
            </div>
        </div>
    )

}
