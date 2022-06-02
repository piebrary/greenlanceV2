import { BiHome } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { VscSettings } from 'react-icons/vsc'
import { FaUsersCog } from 'react-icons/fa'
import { AiOutlineForm } from 'react-icons/ai'
import { BsGrid } from 'react-icons/bs'
import { FiCreditCard } from 'react-icons/fi'
import { BsReverseLayoutTextWindowReverse } from 'react-icons/bs'
import { MdSmartButton } from 'react-icons/md'
import { BiSlideshow } from 'react-icons/bi'
import { IoImages } from 'react-icons/io5'
import { BsTable } from 'react-icons/bs'
import { IoMdHammer } from 'react-icons/io'
import { BsBook } from 'react-icons/bs'
import { BsCalendar2Week } from 'react-icons/bs'
import { BsCardText } from 'react-icons/bs'
import { BsPalette } from 'react-icons/bs'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { IoLanguageOutline } from 'react-icons/io5'

export function menuitems({ isAdmin, getTranslation }){

    return [
        [
            {
                label:<>{getTranslation('DEFAULT')}</>
            },
            {
                to:'/',
                icon:<BiHome size={20} />,
                text:getTranslation('DASHBOARD')
            },
            {
                to:'/profile',
                icon:<FaUser size={20} />,
                text:getTranslation('PROFILE')
            },
            {
                to:'/settings',
                icon:<VscSettings size={20} />,
                text:getTranslation('SETTINGS')
            },
        ],[
            {
                label:<>{getTranslation('ADMIN')}</>,
                hidden:!isAdmin()
            },
            {
                to:'/users',
                icon:<FaUsersCog size={20} />,
                text:getTranslation('USERS'),
                hidden:!isAdmin()
            },
            {
                to:'/builder',
                icon:<IoMdHammer size={20} />,
                text:getTranslation('BUILDER'),
                hidden:!isAdmin()
            },
            {
                to:'/documentation',
                icon:<BsBook size={20} />,
                text:getTranslation('DOCUMENTATION'),
                hidden:!isAdmin()
            },
        ],[
            {
                label:<>{getTranslation('COMPONENTS')}</>
            },
            {
                to:'/calendar',
                icon:<BsCalendar2Week size={20} />,
                text:getTranslation('CALENDAR')
            },
            {
                to:'/grid',
                icon:<BsGrid size={20} />,
                text:getTranslation('GRID')
            },
            {
                to:'/form',
                icon:<AiOutlineForm size={20} />,
                text:getTranslation('FORM')
            },
            {
                to:'/card',
                icon:<FiCreditCard size={20} />,
                text:getTranslation('CARD')
            },
            {
                to:'/button',
                icon:<MdSmartButton size={20} />,
                text:getTranslation('BUTTON')
            },
            {
                to:'/slideshow',
                icon:<BiSlideshow size={20} />,
                text:getTranslation('SLIDESHOW')
            },
            {
                to:'/gallery',
                icon:<IoImages size={20} />,
                text:getTranslation('GALLERY')
            },
            {
                to:'/table',
                icon:<BsTable size={20} />,
                text:getTranslation('TABLE')
            },
            {
                to:'/layout',
                icon:<BsReverseLayoutTextWindowReverse size={20} />,
                text:getTranslation('LAYOUT')
            },
            {
                to:'/textarea',
                icon:<BsCardText size={20} />,
                text:getTranslation('TEXTAREA')
            },
            {
                to:'/notifications',
                icon:<MdOutlineNotificationsActive size={20} />,
                text:getTranslation('NOTIFICATIONS')
            },
        ],[
            {
                label:<>{getTranslation('OTHER')}</>
            },
            {
                to:'/styles',
                icon:<BsPalette size={20} />,
                text:getTranslation('CSS_STYLES')
            },
            {
                to:'/languages',
                icon:<IoLanguageOutline size={20} />,
                text:getTranslation('LANGUAGES')
            },
        ],
    ]
}
