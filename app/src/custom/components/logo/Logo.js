import { BiLibrary } from 'react-icons/bi'

import { createStyle } from '../../../default/utils/createStyle'

import styles from './Logo.module.css'

export default function LogoSmall({ customStyles }){

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            Greenlance
        </div>
    )

}
