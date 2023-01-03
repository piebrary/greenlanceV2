import { useState } from 'react'

import styles from './Container.module.css'

import { createStyle } from '../../utils/createStyle'

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'

export default function Container(attributes){

    const { customStyles, title, children, minimizable, itemCounter, openOnInit } = attributes

    const [isOpen, setIsOpen] = useState(openOnInit || false)

    function onClickHandler(event){

        event.preventDefault()

        setIsOpen(previous => !previous)

    }

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            <div
                className={createStyle([styles, customStyles], 'title')}
                onClick={onClickHandler}
                >
                {title}
                {/* itemCounter && <p className={createStyle([styles, customStyles], 'itemCounter')}>{children.length}</p> */}
                {
                    isOpen
                    ? <MdKeyboardArrowUp size={20} className={createStyle([styles, customStyles], 'arrow')} />
                    : <MdKeyboardArrowDown size={20} className={createStyle([styles, customStyles], 'arrow')} />
                }
            </div>
            <div className={createStyle([styles, customStyles], [isOpen ? 'childrenOpened' : 'childrenClosed'])}>
                {children}
            </div>
        </div>
    )

}
