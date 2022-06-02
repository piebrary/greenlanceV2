import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthenticationContext } from '../../../contexts/AuthenticationContext'
import { UserContext } from '../../../contexts/UserContext'
import { LanguageContext } from '../../../contexts/LanguageContext'

import Logo from '../../logo/Logo'

import { BiMenu } from 'react-icons/bi'
import { IoIosArrowUp } from 'react-icons/io'
import { BiLogOutCircle } from 'react-icons/bi'

import { generateStyles } from '../../../utils/generateStyles'

import styles from './Layout.module.css'

export default function Layout({ items = [], children, customStyles, title, controls }){

    const { logout } = useContext(AuthenticationContext)
    const { userData } = useContext(UserContext)
    const { getTranslation } = useContext(LanguageContext)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [menuClassList, setMenuClassList] = useState([generateStyles([styles, customStyles], 'items')])

    useEffect(() => {

        if(isMenuOpen){
            setMenuClassList(previous => {
                return [...previous, generateStyles([styles, customStyles], 'menuOpen')]
            })
        }

        if(!isMenuOpen){
            setMenuClassList(previous => {
                const list = [...previous]
                const index = list.indexOf(generateStyles([styles, customStyles], 'menuOpen'))
                if(index > -1) list.splice(index, 1)
                return list
            })
        }

    }, [isMenuOpen, customStyles])

    return (
        <div className={styles.layoutContainer}>
            <div className={generateStyles([styles, customStyles], 'menu')}>
                <div className={generateStyles([styles, customStyles], 'logo')}>
                    <Logo />
                </div>
                <div className={menuClassList.join(' ')}>
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
                                            className={generateStyles([styles, customStyles], 'label')}
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
                                            className={generateStyles([styles, customStyles], 'item')}>
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
                                    className={generateStyles([styles, customStyles], 'group')}>
                                    {groupJSX}
                                </div>
                            )

                        })
                    }
                </div>
                <div className={`${generateStyles([styles, customStyles], 'logout')} ${menuClassList.join(' ')}`}>
                    <div>
                        {userData.username}
                    </div>
                    <NavLink
                        to={''}
                        onClick={logout}
                        className={generateStyles([styles, customStyles], 'item')}>
                        <div className={styles.itemIcon}><BiLogOutCircle size={20} /></div>
                        <div className={styles.itemText}>{getTranslation('LOG_OUT')}</div>
                    </NavLink>
                </div>
            </div>
            <div className={generateStyles([styles, customStyles], 'page')}>
                <div className={generateStyles([styles, customStyles], 'header')}>
                    {
                        title && (
                            <div className={generateStyles([styles, customStyles], 'title')}>
                                {title}
                            </div>
                        )
                    }
                    <div className={generateStyles([styles, customStyles], 'controls')}>
                        {controls}
                    </div>
                    <div
                        className={generateStyles([styles, customStyles], 'toggle')}
                        onClick={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}>
                        {
                            isMenuOpen
                            ? <IoIosArrowUp size={40} />
                            : <BiMenu size={40} />
                        }
                    </div>
                </div>
                <div className={generateStyles([styles, customStyles], 'content')}>
                    {children}
                </div>
            </div>
        </div>
    )

}
