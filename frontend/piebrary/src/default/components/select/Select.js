import { generateStyles } from '../../utils/generateStyles'

import styles from './Select.module.css'

export default function Select({ customStyles, label, name, options, defaultValue, onChange, register, errors, rules }){

    return options && (
        <div className={generateStyles([styles, customStyles], 'container')}>
            {
                label && (
                    <div className={generateStyles([styles, customStyles], 'label')}>
                        {label}
                    </div>
                )
            }
            <select
                className={generateStyles([styles, customStyles], 'select')}
                defaultValue={defaultValue?.value}
                {...register(name, rules)}
                onChange={onChange}>
                {
                    options.map(o => {

                        return (
                            <option
                                value={o.value}
                                key={o.value}
                                id={o.name}>
                                {o.name}
                            </option>
                        )

                    })
                }
            </select>
        </div>
    )

}
