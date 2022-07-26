import styles from './ButtonGroup.module.css'

import { createStyle } from '../../utils/createStyle'

export default function ButtonGroup({ customStyles, children }){

    return (
        <div className={createStyle([styles, customStyles], 'buttonGroup')}>
            {children}
        </div>
    )

}
