import styles from './Accordion.module.css'

import { createStyle } from '../../utils/createStyle'
import { applyStyles } from '../../utils/applyStyles'

export default function Accordion(attributes){

    const {
        customStyles,
        categories,
        data,
        properties
    } = attributes

    //////////// NOT FINISHED,

    retur

    return (
        <div
            className={createStyle([styles, customStyles], 'container')}
            >
            {
                categories.map(category => {

                    return (
                        <div className={createStyle([styles, customStyles], 'categoryLabel')}>
                            {
                                data.map(item => {

                                    item.category === category.name && return item

                                    return null

                                })
                            }
                        </div>
                    )

                })
            }
        </div>
    )

}
