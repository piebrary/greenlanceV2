import { useContext } from 'react'

import { NavLink } from 'react-router-dom'

import { VisualsContext } from '../../../default/contexts/VisualsContext'

import { createStyle } from '../../utils/createStyle'

import { BsPersonCircle } from 'react-icons/bs'
import { CgLogOff } from 'react-icons/cg'
import { MdLightMode } from 'react-icons/md'
import { MdDarkMode } from 'react-icons/md'

import styles from './Controls.module.css'

export default function Card({ customStyles }){

    const { getDarkmode, toggleDarkmode } = useContext(VisualsContext)

    return (
        <div
            className={createStyle([styles, customStyles], 'container')}
            >
            <div>
                {
                    getDarkmode()
                    ? <MdDarkMode onClick={() => toggleDarkmode()}/>
                    : <MdLightMode onClick={() => toggleDarkmode()}/>
                }
            </div>
            <NavLink to={'/profile'}><BsPersonCircle /></NavLink>
            <NavLink to={'/logout'}><CgLogOff /></NavLink>
        </div>
    )

}
