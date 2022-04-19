import styles from './Card.module.css'

import { generateStyles } from '../../../utils/generateStyles'

export default function Card({ customStyles, children, onClick, title }){

    const cardStyle = `${onClick ? styles.clickable : undefined} ${generateStyles([styles, customStyles], 'card')}`

    return (
        <div
            className={cardStyle}
            onClick={event => onClick && onClick(event)}>
            {
                title && (
                    <div className={generateStyles([styles, customStyles], 'title')}>
                        {title}
                    </div>
                )
            }
            <div className={generateStyles([styles, customStyles], 'content')}>
                {children}
            </div>
        </div>
    )

}
