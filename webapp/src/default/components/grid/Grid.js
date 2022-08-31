import styles from './Grid.module.css'

import { createStyle } from '../../utils/createStyle'

export default function Grid({ customStyles, children }){

    return (
        <div className={createStyle([styles, customStyles], 'grid')}>
            {
                children
            }
        </div>
    )

}
