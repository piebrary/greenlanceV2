import styles from './ButtonGroup.module.css'

import { generateStyles } from '../../utils/generateStyles'

export default function ButtonGroup({ customStyles, children }){

    return (
        <div className={generateStyles([styles, customStyles], 'buttonGroup')}>
            {children}
        </div>
    )

}
