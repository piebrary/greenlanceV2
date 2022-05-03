import styles from './Checkbox.module.css'

import { generateStyles } from '../../utils/generateStyles'

export default function Checkbox({ customStyles, label, name, options, onChange, register, errors, rules }){

    return options && (
        <div className={generateStyles([styles, customStyles], 'container')}>
            {
                label && (
                    <div className={generateStyles([styles, customStyles], 'label')}>
                        {label}
                    </div>
                )
            }
            <div className={generateStyles([styles, customStyles], 'checkboxes')}>
                {
                    options.map(o => {

                        return (
                            <label
                                className={generateStyles([styles, customStyles], 'checkboxPair')}
                                key={o.name}>
                                <input
                                    type='checkbox'
                                    className={generateStyles([styles, customStyles], 'checkbox')}
                                    onClick={event => onChange && onChange(event)}
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
