import { generateStyles } from '../../utils/generateStyles'

import styles from './Input.module.css'

export default function Input({ customStyles, label, name, type, placeholder, readOnly, defaultValue, onChange, hideToggle, rules, register, errors }){

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
                <input
                    className={generateStyles([styles, customStyles], 'input')}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    readOnly={readOnly}
                    {...reg}/>
                {reg && errors[name] && (
                    <span className={generateStyles([styles, customStyles], 'errorMessage')}>
                        {errors[name].message}
                    </span>
                )}
            </div>
        </div>
    )

}
