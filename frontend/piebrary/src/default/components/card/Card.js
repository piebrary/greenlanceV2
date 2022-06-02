import styles from './Card.module.css'

import { generateStyles } from '../../utils/generateStyles'

export default function Card({ customStyles, children, onClick, title, description }){

    const cardStyle = `${onClick ? generateStyles([styles, customStyles], 'clickable') : ''} ${generateStyles([styles, customStyles], 'card')}`

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
            {
                description && (
                    <div className={generateStyles([styles, customStyles], 'description')}>
                        {description}
                    </div>
                )
            }
            <div className={generateStyles([styles, customStyles], 'body')}>
                {children}
            </div>
        </div>
    )

}
