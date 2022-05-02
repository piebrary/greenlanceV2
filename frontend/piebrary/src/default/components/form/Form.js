import { generateStyles } from '../../utils/generateStyles'

import styles from './Form.module.css'

export default function Form({ customStyles, children, onSubmit }){

    return (
        <form
            onSubmit={onSubmit}
            className={generateStyles([styles, customStyles], 'form')}>
            {children}
        </form>
    )

}
