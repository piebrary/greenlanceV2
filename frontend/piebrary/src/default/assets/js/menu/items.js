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
import { BsListOl } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'
import { IoLogoCss3 } from 'react-icons/io5'
import { BiTime } from 'react-icons/bi'
import { MdOutlineEmail } from 'react-icons/md'

export function menuitems({ userData, isAdmin, applyTranslation }){

    return [
        [
            {
                label:<>{applyTranslation('DEFAULT')}</>
            },
            {
                to:'/',
                icon:<BiHome size={20} />,
                text:applyTranslation('DASHBOARD')
            },
            {
                to:'/profile',
                icon:<FaUser size={20} />,
                text:applyTranslation('PROFILE')
            },
            {
                to:'/settings',
                icon:<VscSettings size={20} />,
                text:applyTranslation('SETTINGS')
            },
            {
                to:'/users',
                icon:<FaUsersCog size={20} />,
                text:applyTranslation('USERS') + ' (ADMIN)',
                hidden:!isAdmin()
            },
            {
                to:'/builder',
                icon:<IoMdHammer size={20} />,
                text:applyTranslation('BUILDER') + ' (ADMIN)',
                hidden:!isAdmin()
            },
            {
                to:'/documentation',
                icon:<BsBook size={20} />,
                text:applyTranslation('DOCUMENTATION') + ' (ADMIN)',
                hidden:!isAdmin()
            },
            {
                to:'/email',
                icon:<MdOutlineEmail size={20} />,
                text:applyTranslation('EMAIL') + ' (ADMIN)',
                hidden:!isAdmin()
            },
        ],[
            {
                label:<>{applyTranslation('COMPONENTS')}</>
            },
            {
                to:'/calendar',
                icon:<BsCalendar2Week size={20} />,
                text:applyTranslation('CALENDAR')
            },
            {
                to:'/grid',
                icon:<BsGrid size={20} />,
                text:applyTranslation('GRID')
            },
            {
                to:'/form',
                icon:<AiOutlineForm size={20} />,
                text:applyTranslation('FORM')
            },
            {
                to:'/card',
                icon:<FiCreditCard size={20} />,
                text:applyTranslation('CARD')
            },
            {
                to:'/button',
                icon:<MdSmartButton size={20} />,
                text:applyTranslation('BUTTON')
            },
            {
                to:'/list',
                icon:<BsListOl size={20} />,
                text:applyTranslation('LIST')
            },
            {
                to:'/slideshow',
                icon:<BiSlideshow size={20} />,
                text:applyTranslation('SLIDESHOW')
            },
            {
                to:'/gallery',
                icon:<IoImages size={20} />,
                text:applyTranslation('GALLERY')
            },
            {
                to:'/table',
                icon:<BsTable size={20} />,
                text:applyTranslation('TABLE')
            },
            {
                to:'/layout',
                icon:<BsReverseLayoutTextWindowReverse size={20} />,
                text:applyTranslation('LAYOUT')
            },
            {
                to:'/textarea',
                icon:<BsCardText size={20} />,
                text:applyTranslation('TEXTAREA')
            },
            {
                to:'/notifications',
                icon:<MdOutlineNotificationsActive size={20} />,
                text:applyTranslation('NOTIFICATIONS')
            },
            {
                to:'/confirm',
                icon:<AiOutlineCheck size={20} />,
                text:applyTranslation('CONFIRM_DIALOG')
            },
        ],[
            {
                label:<>{applyTranslation('STYLING')}</>
            },
            {
                to:'/css',
                icon:<IoLogoCss3 size={20} />,
                text:applyTranslation('CSS')
            },
            {
                to:'/themes',
                icon:<BsPalette size={20} />,
                text:applyTranslation('THEMES')
            },
        ],[
            {
                label:<>{applyTranslation('LOCALIZATION')}</>
            },
            {
                to:'/languages',
                icon:<IoLanguageOutline size={20} />,
                text:applyTranslation('LANGUAGES')
            },
            {
                to:'/datetime',
                icon:<BiTime size={20} />,
                text:applyTranslation('DATETIME')
            },
        ],[
            {
                label:<>{applyTranslation('LOGOUT')}</>
            },
            {
                to:'/logout',
                icon:<IoLanguageOutline size={20} />,
                text:applyTranslation('LOGOUT')
            },
        ]

    ]
}
