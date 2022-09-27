import { useState, useEffect, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthenticationContext } from '../../../../default/contexts/AuthenticationContext'
import { UserContext } from '../../../../default/contexts/UserContext'
import { LanguageContext } from '../../../../default/contexts/LanguageContext'

import Logo from '../../../../default/components/logo/Logo'

import { BiMenu } from 'react-icons/bi'
import { IoIosArrowUp } from 'react-icons/io'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

import { createStyle } from '../../../../default/utils/createStyle'

import styles from './Layout.module.css'

export default function Layout({ items = [], children, customStyles, title, controls, logo }){

    const { logout } = useContext(AuthenticationContext)
    const { userData } = useContext(UserContext)
    const { applyTranslation } = useContext(LanguageContext)

    const [contentHeight, setContentHeight] = useState(0)
    const [contentTop, setContentTop] = useState(0)

    const contentRef = useRef()
    const menuRef = useRef()

    function handleResize(){

        if(!contentRef) return
        if(!menuRef) return

        const contentRefTop = contentRef.current.getBoundingClientRect().y
        const menuRefTop = menuRef.current.getBoundingClientRect().y

        setContentHeight(menuRefTop - contentRefTop)

    }

    useEffect(() => {

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)

    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <p>Battle Royale Chess</p>
                <p>{title}</p>
                <p>Logout</p>
            </div>
            <div className={styles.content} ref={contentRef} style={{ height: contentHeight }}>
                {children}
            </div>
            <div className={styles.menu} ref={menuRef}>
                {
                    items.map(group => {

                        return group.map(item => {

                            if(item) {

                                return (
                                    <NavLink
                                        to={item.to}
                                        key={item.to}
                                        className={({ isActive }) => isActive ? createStyle([styles, customStyles], 'menuitemActive') : createStyle([styles, customStyles], 'menuitem')}
                                        >
                                        {item.text}
                                    </NavLink>
                                )

                            }

                        })

                    })
                }
            </div>
        </div>
    )

}
