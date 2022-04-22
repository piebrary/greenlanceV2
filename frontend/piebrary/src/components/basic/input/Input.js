import { generateStyles } from '../../../utils/generateStyles'

import styles from './Input.module.css'

export default function Input({ customStyles, label, name, subtype, placeholder, readOnly, defaultValue, onChange, hideToggle, rules, register, errors }){

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
                <input
                    className={generateStyles([styles, customStyles], 'input')}
                    id={name}
                    type={subtype}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    readOnly={readOnly}
                    {...register(name, rules)}
                    onChange={event => onChange && onChange(event)}/>
                {errors[name] && <span className={generateStyles([styles, customStyles], 'errorMessage')}>{rules[errors[name].type]}</span>}
            </div>
        </div>
    )

}
