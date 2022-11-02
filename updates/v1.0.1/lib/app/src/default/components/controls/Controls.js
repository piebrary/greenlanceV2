import { useContext } from 'react'

import { NavLink } from 'react-router-dom'

import { VisualsContext } from '../../../default/contexts/VisualsContext'

import { createStyle } from '../../utils/createStyle'

import { BsPersonCircle } from 'react-icons/bs'
import { HiOutlineLogout } from 'react-icons/hi'
import { MdLightMode } from 'react-icons/md'
import { MdDarkMode } from 'react-icons/md'

import styles from './Controls.module.css'

export default function Card({ customStyles }){

    const { getDarkmode, toggleDarkmode } = useContext(VisualsContext)

    return (
        <div
            className={createStyle([styles, customStyles], 'container')}
            >
            <div
                 onClick={() => toggleDarkmode()}
                >
                {
                    getDarkmode()
                    ? <MdDarkMode/>
                    : <MdLightMode/>
                }
            </div>
            <NavLink to={'/profile'}><BsPersonCircle /></NavLink>
            <NavLink to={'/logout'}><HiOutlineLogout /></NavLink>
        </div>
    )

}
