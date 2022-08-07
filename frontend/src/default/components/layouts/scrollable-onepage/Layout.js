import { useRef, useState, useEffect } from 'react'

import { FiMenu } from 'react-icons/fi'

import styles from './Layout.module.css'

export default function Layout({ children, menuitems, content }){

    const menuRef = useRef()
    const [menuHeight, setMenuHeight] = useState()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {

        handleWindowResize()

        window.addEventListener('resize', handleWindowResize)

        return () => {

            window.removeEventListener('resize', handleWindowResize)

        }

    }, [])

    const handleWindowResize = () => {

        setMenuHeight(menuRef.current.offsetHeight)

    }

    const handleItemClick = (event, targetId) => {

        event.preventDefault()

        const target = document.getElementById(targetId)

        target && window.scrollTo({
            top:
                target.getBoundingClientRect().top -
                document.body.getBoundingClientRect().top -
                menuHeight,
            behavior:'smooth'
        })

        setIsMenuOpen(false)

    }

    return (
        <>
            <div
                className={styles.container}
                >
                <main
                    className={styles.content}
                    >
                    {children}
                </main>
                <nav
                id={'menu'}
                    className={`${styles.menu} ${isMenuOpen && styles.open || ''}`}
                    >
                    <div
                        ref={menuRef}
                        className={styles.menubar}
                        >
                        <div
                            className={styles.menuToggle}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                            <FiMenu size={30} />
                        </div>
                        <div
                            className={styles.menuitems}
                            >
                            {
                                menuitems.map((menuitem, index) => {

                                    return (
                                        <div
                                            key={menuitem.text}
                                            className={styles.menuitem}
                                            onClick={event => handleItemClick(event, menuitem.text)}
                                            >
                                            {menuitem.text}
                                        </div>
                                    )

                                })
                            }
                        </div>
                    </div>
                    <div
                        className={styles.contentOverlay}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                    </div>
                    <div
                    id={'mobileMenuPane'}
                        className={styles.mobileMenuPane}
                        >
                        {
                            menuitems.map((menuitem, index) => {

                                return (
                                    <div
                                        key={menuitem.text}
                                        className={styles.menuitem}
                                        onClick={event => handleItemClick(event, menuitem.text)}
                                        >
                                        {menuitem.text}
                                    </div>
                                )

                            })
                        }
                    </div>
                </nav>
            </div>
        </>
    )

}
