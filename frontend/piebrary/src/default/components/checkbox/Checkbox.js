import styles from './Checkbox.module.css'

import { createStyle } from '../../utils/createStyle'

export default function Checkbox({ customStyles, label, name, options, onClick, register, errors, rules }){

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
            <div className={createStyle([styles, customStyles], 'checkboxes')}>
                {
                    options.map(o => {

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
