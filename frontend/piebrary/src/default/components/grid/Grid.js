import styles from './Grid.module.css'

import { generateStyles } from '../../utils/generateStyles'

export default function Grid({ customStyles, children }){

    return (
        <div className={generateStyles([styles, customStyles], 'grid')}>
            {
                children
            }
        </div>
    )

}
