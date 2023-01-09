import styles from './Button.module.css'

import { createStyle } from '../../utils/createStyle'

export default function Button(attributes){

    const {
        customStyles,
        label,
        onClick,
        type,
        preventDefault = false
    } = attributes

    function handleOnClick(event){

        if(preventDefault) event.preventDefault()

        if(onClick) onClick(event)

    }

    return (
        <button
            className={createStyle([styles, customStyles], 'button')}
            onClick={handleOnClick}
            type={type}>
            {label}
        </button>
    )

}
