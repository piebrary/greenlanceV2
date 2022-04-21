import styles from './Select.module.css'

import { generateStyles } from '../../../utils/generateStyles'

export default function Select({ customStyles, name, options, selectedOption, onChange }){

    return options && (
        <select
            className={generateStyles([styles, customStyles], 'select')}
            onChange={onChange}
            defaultValue={selectedOption?.value}>
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
    )

}
