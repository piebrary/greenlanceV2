import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthenticationContext } from '../../../contexts/AuthenticationContext'
import { UserContext } from '../../../contexts/UserContext'
import { LanguageContext } from '../../../contexts/LanguageContext'

import Logo from '../../logo/Logo'

import { BiMenu } from 'react-icons/bi'
import { IoIosArrowUp } from 'react-icons/io'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

import { createStyle } from '../../../utils/createStyle'

import styles from './Layout.module.css'

export default function Layout({ items = [], children, customStyles, title, controls }){

    const { logout } = useContext(AuthenticationContext)
    const { userData } = useContext(UserContext)
    const { applyTranslation } = useContext(LanguageContext)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [menuClassList, setMenuClassList] = useState([createStyle([styles, customStyles], 'menu')])
    const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false)

    useEffect(() => {

        if(isMenuOpen){
            setMenuClassList(previous => {
                return [...previous, createStyle([styles, customStyles], 'menuOpen')]
            })
        }

        if(!isMenuOpen){
            setMenuClassList(previous => {
                const list = [...previous]
                const index = list.indexOf(createStyle([styles, customStyles], 'menuOpen'))
                if(index > -1) list.splice(index, 1)
                return list
            })
        }

    }, [isMenuOpen, customStyles])

    useEffect(() => {

        const body = document.querySelector('body')

        body.scrollTo({
            top:0,
            behavior: 'smooth'
        })

        body.addEventListener('scroll', () => {

            if (body.scrollTop > 100 && !isMenuOpen) {

                setShowScrollToTopBtn(true)

            } else {

                setShowScrollToTopBtn(false)

            }

        }, { capture: true })

    }, [isMenuOpen])

    return (
        <div id={'layoutContainer'} className={styles.layoutContainer}>
            {
                showScrollToTopBtn && (
                    <div
                        className={createStyle([styles, customStyles], 'scrollToTopBtn')}
                        onClick={event => {

                            const body = document.querySelector('body')

                            body.scrollTo({
                                top:0,
                                behavior: 'smooth'
                            })
                        }}
                        >
                        <BsFillArrowUpCircleFill size={30} />
                    </div>
                )
            }
            <div className={menuClassList.join(' ')}>
                <div className={createStyle([styles, customStyles], 'headerResponsive')}>
                    <div className={createStyle([styles, customStyles], 'logo')}>
                        <Logo />
                    </div>
                    {
                        title && (
                            <div className={createStyle([styles, customStyles], 'titleResponsive')}>
                                {title}
                            </div>
                        )
                    }
                    <div
                        className={createStyle([styles, customStyles], 'toggle')}
                        onClick={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}>
                        {
                            isMenuOpen
                            ? <IoIosArrowUp size={40} />
                            : <BiMenu size={40} />
                        }
                    </div>
                </div>
                <div className={createStyle([styles, customStyles], 'items')}>
                    {
                        items.map((group, i) => {

                            const groupJSX = []

                            group.map(item => {

                                if(item.hidden){

                                    return undefined

                                }

                                if(item.label){

                                    groupJSX.push(
                                        <div
                                            className={createStyle([styles, customStyles], 'label')}
                                            key={item.label}>
                                            {item.label}
                                        </div>
                                    )

                                }

                                if(item.to){

                                    groupJSX.push(
                                        <NavLink
                                            to={item.to}
                                            key={item.to}
                                            className={createStyle([styles, customStyles], 'item')}>
                                            <div className={styles.itemIcon}>{item.icon}</div>
                                            <div className={styles.itemText}>{item.text}</div>
                                        </NavLink>
                                    )

                                }

                                return undefined

                            })

                            return (
                                <div
                                    key={i}
                                    className={createStyle([styles, customStyles], 'group')}>
                                    {groupJSX}
                                </div>
                            )

                        })
                    }
                </div>
            </div>
            <div
                id={'page'}
                className={createStyle([styles, customStyles], 'page')}
                >
                <div className={createStyle([styles, customStyles], 'header')}>
                    {
                        title && (
                            <div className={createStyle([styles, customStyles], 'title')}>
                                {title}
                            </div>
                        )
                    }
                </div>
                <div className={createStyle([styles, customStyles], 'content')}>
                    {children}
                </div>
            </div>
        </div>
    )

}
