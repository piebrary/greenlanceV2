import styles from './Button.module.css'

import { generateStyles } from '../../../utils/generateStyles'

export default function Button({ customStyles, label, onClick }){

    return (
        <button
            className={generateStyles([styles, customStyles], 'button')}
            onClick={event => onClick && onClick(event)}>
            {label}
        </button>
    )

}
