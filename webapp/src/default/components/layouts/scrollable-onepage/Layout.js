import { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { FiMenu } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'

import { createStyle } from '../../../utils/createStyle'

import styles from './Layout.module.css'

export default function Layout({ children, logo, menuitems, content, customStyles }){

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleItemClick = (event, targetId, targetType = 'section') => {

        if(targetType === 'section'){

            event.preventDefault()

            const target = document.getElementById(targetId)

            target && window.scrollTo({
                top:
                    target.getBoundingClientRect().top -
                    document.body.getBoundingClientRect().top -
                    100,
                behavior:'smooth'
            })

            setIsMenuOpen(false)

        }

    }

    return (
        <>
            <div
                className={createStyle([styles, customStyles], 'container')}
                >
                <main
                    className={createStyle([styles, customStyles], 'content')}
                    >
                    {children}
                </main>
                <nav
                    id={'menu'}
                    className={`${createStyle([styles, customStyles], 'menu')} ${isMenuOpen && createStyle([styles, customStyles], 'open') || ''}`}
                    >
                    <div
                        className={createStyle([styles, customStyles], 'menubar')}
                        >
                        <div
                            className={createStyle([styles, customStyles], 'logo')}
                            >
                            {logo}
                        </div>
                        <div
                            className={createStyle([styles, customStyles], 'menuToggle')}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                            {!isMenuOpen && <FiMenu size={40} />}
                            {isMenuOpen && <MdClose size={40} />}
                        </div>
                        <div
                            className={createStyle([styles, customStyles], 'menuitems')}
                            >
                            {
                                menuitems.map((menuitem, index) => {

                                    return (
                                        <NavLink
                                            key={menuitem.text}
                                            to={menuitem.to}
                                            className={createStyle([menuitem.customStyles], 'menuitem') || createStyle([styles, customStyles], 'menuitem') || styles.menuitem}
                                            onClick={event => handleItemClick(event, menuitem.text, menuitem.targetType)}
                                            >
                                            {menuitem.text}
                                        </NavLink>
                                    )

                                })
                            }
                        </div>
                    </div>
                    <div
                        className={createStyle([styles, customStyles], 'contentOverlay')}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                    </div>
                    <div
                        id={'mobileMenuPane'}
                        className={createStyle([styles, customStyles], 'mobileMenuPane')}
                        >
                        {
                            menuitems.map((menuitem, index) => {

                                return (
                                    <NavLink
                                        key={menuitem.text}
                                        to={menuitem.to}
                                        className={createStyle([menuitem.customStyles], 'menuitem') || createStyle([styles, customStyles], 'menuitem') || styles.menuitem}
                                        onClick={event => handleItemClick(event, menuitem.text, menuitem.targetType)}
                                        >
                                        {menuitem.text}
                                    </NavLink>
                                )

                            })
                        }
                    </div>
                </nav>
            </div>
        </>
    )

}
