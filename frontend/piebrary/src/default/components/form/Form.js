import { createStyle } from '../../utils/createStyle'

import styles from './Form.module.css'

export default function Form({ customStyles, children, onSubmit }){

    return (
        <form
            onSubmit={onSubmit}
            className={createStyle([styles, customStyles], 'form')}>
            {children}
        </form>
    )

}
