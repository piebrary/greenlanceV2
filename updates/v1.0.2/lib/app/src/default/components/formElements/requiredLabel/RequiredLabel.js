import { createStyle } from '../../../utils/createStyle'

import styles from './RequiredLabel.module.css'

export default function RequiredLabel(attributes){

    const {
        customStyles
    } = attributes

    return <span className={createStyle([styles, customStyles], 'container')}>Required</span>

}
