import styles from './Checkbox.module.css'

import { generateStyles } from '../../utils/generateStyles'

export default function Checkbox({ customStyles, label, name, options, onClick, register, errors, rules }){

    return options && (
        <div className={generateStyles([styles, customStyles], 'container')}>
            {
                label && (
                    <label
                        htmlFor={name}
                        className={generateStyles([styles, customStyles], 'label')}
                        >
                        {label}
                    </label>
                )
            }
            <div className={generateStyles([styles, customStyles], 'checkboxes')}>
                {
                    options.map(o => {

                        return (
                            <label
                                className={`${ o.disabled ? generateStyles([styles, customStyles], 'checkboxPairDisabled') : generateStyles([styles, customStyles], 'checkboxPair')}`}
                                key={o.name}>
                                <input
                                    type='checkbox'
                                    className={generateStyles([styles, customStyles], 'checkbox')}
                                    onClick={event => onClick && onClick(event)}
                                    defaultChecked={o.checked}
                                    disabled={o.disabled}
                                    {...register(label + o.value, rules)}/>
                                {o.name}
                            </label>
                        )

                    })
                }
            </div>
        </div>
    )

}
