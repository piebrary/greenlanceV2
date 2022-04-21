import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'

import { AuthenticationContext } from '../../../../contexts/AuthenticationContext'
import { LanguageContext } from '../../../../contexts/LanguageContext'

import LogoSmall from '../../../custom/logoSmall/LogoSmall'

import { BiMenu } from 'react-icons/bi'
import { IoIosArrowUp } from 'react-icons/io'
import { BiLogOutCircle } from 'react-icons/bi'

import { generateStyles } from '../../../../utils/generateStyles'

import styles from './Layout.module.css'

export default function Layout({ menuItems, children, customStyles, pageTitle }){

    const { logout } = useContext(AuthenticationContext)
    const { translate } = useContext(LanguageContext)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [menuClassList, setMenuClassList] = useState([generateStyles([styles, customStyles], 'menuItems')])

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
                <div className={generateStyles([styles, customStyles], 'menuHeader')}>
                    <div className={generateStyles([styles, customStyles], 'logo')}>
                        <LogoSmall />
                    </div>
                    <div className={generateStyles([styles, customStyles], 'title')}>
                        {pageTitle}
                    </div>
                    <div
                        className={generateStyles([styles, customStyles], 'menuToggle')}
                        onClick={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}>
                        {
                            isMenuOpen
                            ? <IoIosArrowUp size={40} />
                            : <BiMenu size={40} />
                        }
                    </div>
                </div>
                <div className={menuClassList.join(' ')}>
                    {
                        menuItems.map((group, i) => {

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
                    <NavLink
                        to={''}
                        onClick={logout}
                        className={generateStyles([styles, customStyles], 'item')}>
                        <div className={styles.itemIcon}><BiLogOutCircle size={20} /></div>
                        <div className={styles.itemText}>{translate('LOG_OUT')}</div>
                    </NavLink>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.spacing}/>
                {children}
            </div>
        </div>
    )

}
