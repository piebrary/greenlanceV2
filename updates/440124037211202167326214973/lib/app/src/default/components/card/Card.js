import styles from './Card.module.css'

import { createStyle } from '../../utils/createStyle'

export default function Card({ customStyles, children, onClick, title, description }){

    const cardStyle = `${onClick ? createStyle([styles, customStyles], 'clickable') : ''} ${createStyle([styles, customStyles], 'card')}`

    return (
        <div
            className={cardStyle}
            onClick={event => onClick && onClick(event)}>
            {
                title && (
                    <div className={createStyle([styles, customStyles], 'title')}>
                        {title}
                    </div>
                )
            }
            {
                description && (
                    <div className={createStyle([styles, customStyles], 'description')}>
                        {description}
                    </div>
                )
            }
            <div className={createStyle([styles, customStyles], 'body')}>
                {children}
            </div>
        </div>
    )

}
