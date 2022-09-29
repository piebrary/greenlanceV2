import { createStyle } from '../../utils/createStyle'

import styles from './List.module.css'

import { BsAsterisk } from 'react-icons/bs'

export default function({ customStyles, items, bullets }){

    return (
        <div
            className={createStyle([styles, customStyles], 'container')}
            >
            {
                items && items.map((item, i) => {

                    const classList = [createStyle([styles, customStyles], 'item')]

                    item.onClick && classList.push(createStyle([styles, customStyles], 'clickable'))

                    return (
                        <div
                            key={item.text + i}
                            className={classList.join(' ')}
                            onClick={event => item.onClick && item.onClick(event)}
                            >
                            {
                                !item.icon && bullets && (
                                    <div
                                        className={createStyle([styles, customStyles], 'bullet')}
                                        >
                                        { bullets === 'unordered' && <BsAsterisk size={8} /> }
                                        { bullets === 'ordered' && <>{ i + 1 } -</> }
                                    </div>
                                )
                            }
                            {
                                item.icon && (
                                    <div
                                        className={createStyle([styles, customStyles], 'icon')}
                                        >
                                        {item.icon}
                                    </div>
                                )
                            }
                            {item.text}
                        </div>
                    )

                })
            }
        </div>
    )

}
