import { useState, useRef, createRef } from 'react'

import { createStyle } from '../../../utils/createStyle'

import styles from './Layout.module.css'

export default function Layout({ menuitems = [], views = [], customStyles }){

    const refs = useRef(views.map(() => createRef()))

    function goScroll(index){

        refs.current[index].current.scrollIntoView({ behavior:'smooth' })

    }

    return (
        <div id={'layoutContainer'} className={styles.layoutContainer}>
            <div id={'menuContainer'} className={styles.menuContainer}>
                <div id={'logo'} className={styles.logo}>
                    MILOO
                </div>
                <div id={'menuitems'} className={styles.menuitems}>
                    {
                        menuitems.map((item, index) => {

                            return (
                                <div
                                    key={item.label}
                                    className={styles.menuitem}
                                    onClick={event => goScroll(index)}
                                    >
                                    {item.label}
                                </div>
                            )

                        })
                    }
                </div>
            </div>
            {
                views.map((view, index) => {

                    return (
                        <div key={index} className={styles.view} ref={refs.current[index]}>
                            {
                                view
                            }
                        </div>
                    )

                })
            }
        </div>
    )

}
