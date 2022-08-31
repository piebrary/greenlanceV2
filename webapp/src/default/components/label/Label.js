import { createStyle } from '../../utils/createStyle'

import styles from './Label.module.css'

export default function Label(attributes){

    const {
        customStyles,
        children
    } = attributes

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            <div className={createStyle([styles, customStyles], 'label')}>
                {children}
            </div>
        </div>
    )

}
