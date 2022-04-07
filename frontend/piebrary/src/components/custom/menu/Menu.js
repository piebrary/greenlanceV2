import { Menu1 } from '../../components/basic/menu/menu1'

import { BiHome } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { VscSettings } from 'react-icons/vsc'
import { FaUsersCog } from 'react-icons/fa'

import styles from './Menu.module.css'

export default function Menu({ placing = 'left' }){

    return (
        <Menu1
            placing
            links={[[
                {
                    label:<>Pages</>
                },
                {
                    to:'/',
                    content:(<><BiHome size={20} /> {getLanguage('DASHBOARD')}</>
                },
            ],[
                {
                    label:<>User</>
                },
                {
                    to:'/profile',
                    content:<><FaUser size={20} /> {getLanguage('PROFILE')}</>
                },
                {
                    to:'/settings',
                    content:<><VscSettings size={20} /> {getLanguage('SETTINGS')}</>
                },
            ],[
                {
                    label:<>Admin</>
                },
                {
                    to:'/users',
                    content:<><FaUsersCog size={20} /> {getLanguage('USERS')}</>
                },
            ]]}
            style={{}}
            >
        </Menu1>
    )
}
