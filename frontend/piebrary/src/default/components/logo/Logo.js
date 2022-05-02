import { BiLibrary } from 'react-icons/bi'

import { generateStyles } from '../../utils/generateStyles'

import styles from './Logo.module.css'

export default function LogoSmall({ customStyles }){

    return (
        <div className={generateStyles([styles, customStyles], 'container')}>
            PieBrary
        </div>
    )

}
