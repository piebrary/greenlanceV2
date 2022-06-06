import styles from './Button.module.css'

import { createStyle } from '../../utils/createStyle'

export default function Button({ customStyles, label, onClick, type }){

    return (
        <button
            className={createStyle([styles, customStyles], 'button')}
            onClick={event => onClick && onClick(event)}
            type={type}>
            {label}
        </button>
    )

}
