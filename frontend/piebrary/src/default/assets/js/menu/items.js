import { BiHome } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { VscSettings } from 'react-icons/vsc'
import { FaUsersCog } from 'react-icons/fa'
import { AiOutlineForm } from 'react-icons/ai'
import { BsGrid } from 'react-icons/bs'
import { FiCreditCard } from 'react-icons/fi'
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs'
import { BiRectangle } from 'react-icons/bi'
import { BiSlideshow } from 'react-icons/bi'
import { IoImages } from 'react-icons/io5'
import { BsTable } from 'react-icons/bs'
import { IoMdHammer } from 'react-icons/io'
import { BsBook } from 'react-icons/bs'
import { BsCalendar2Week } from 'react-icons/bs'
import { BsCardText } from 'react-icons/bs'
import { BsPalette } from 'react-icons/bs'
import { MdOutlineNotificationsActive } from 'react-icons/md'

export function menuitems({ isAdmin, translate }){

    return [
        [
            {
                label:<>{translate('DEFAULT')}</>
            },
            {
                to:'/',
                icon:<BiHome size={20} />,
                text:translate('DASHBOARD')
            },
            {
                to:'/profile',
                icon:<FaUser size={20} />,
                text:translate('PROFILE')
            },
            {
                to:'/settings',
                icon:<VscSettings size={20} />,
                text:translate('SETTINGS')
            },
        ],[
            {
                label:<>{translate('ADMIN')}</>,
                hidden:!isAdmin()
            },
            {
                to:'/users',
                icon:<FaUsersCog size={20} />,
                text:translate('USERS'),
                hidden:!isAdmin()
            },
            {
                to:'/builder',
                icon:<IoMdHammer size={20} />,
                text:translate('BUILDER'),
                hidden:!isAdmin()
            },
            {
                to:'/documentation',
                icon:<BsBook size={20} />,
                text:translate('DOCUMENTATION'),
                hidden:!isAdmin()
            },
        ],[
            {
                label:<>{translate('COMPONENTS')}</>
            },
            {
                to:'/calendar',
                icon:<BsCalendar2Week size={20} />,
                text:translate('CALENDAR')
            },
            {
                to:'/grid',
                icon:<BsGrid size={20} />,
                text:translate('GRID')
            },
            {
                to:'/form',
                icon:<AiOutlineForm size={20} />,
                text:translate('FORM')
            },
            {
                to:'/card',
                icon:<FiCreditCard size={20} />,
                text:translate('CARD')
            },
            {
                to:'/button',
                icon:<BiRectangle size={20} />,
                text:translate('BUTTON')
            },
            {
                to:'/slideshow',
                icon:<BiSlideshow size={20} />,
                text:translate('SLIDESHOW')
            },
            {
                to:'/gallery',
                icon:<IoImages size={20} />,
                text:translate('GALLERY')
            },
            {
                to:'/table',
                icon:<BsTable size={20} />,
                text:translate('TABLE')
            },
            {
                to:'/layout',
                icon:<BsReverseLayoutTextWindowReverse size={20} />,
                text:translate('LAYOUT')
            },
            {
                to:'/textarea',
                icon:<BsCardText size={20} />,
                text:translate('TEXTAREA')
            },
            {
                to:'/notification',
                icon:<MdOutlineNotificationsActive size={20} />,
                text:translate('NOTIFICATIONS')
            },
        ],[
            {
                label:<>{translate('OTHER')}</>
            },
            {
                to:'/styles',
                icon:<BsPalette size={20} />,
                text:translate('CSS_STYLES')
            },
        ],
    ]
}
