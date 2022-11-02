import { BiHome } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { VscSettings } from 'react-icons/vsc'
import { FaUsersCog } from 'react-icons/fa'
import { AiOutlineFolderOpen } from 'react-icons/ai'
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
import { AiOutlineBarChart } from 'react-icons/ai'
import { IoLogoCss3 } from 'react-icons/io5'
import { BiTime } from 'react-icons/bi'
import { MdOutlineEmail } from 'react-icons/md'
import { HiOutlineLogout } from 'react-icons/hi'
import { FaFileInvoiceDollar } from 'react-icons/fa'
import { FaQuestionCircle } from 'react-icons/fa'
import { BsClockHistory } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'

export function menuitems({ userData, isAdmin, applyTranslation, createTranslation }){

    return [
        [
            {
                label:<>{applyTranslation('WORK')}</>
            },
            {
                to:'/',
                icon:<BiHome size={20} />,
                text:applyTranslation('DASHBOARD')
            },
            {
                to:'/calendar',
                icon:<BsCalendar2Week size={20} />,
                text:applyTranslation('CALENDAR')
            },
            {
                to:'/shifts',
                icon:<BsClockHistory size={20} />,
                text:applyTranslation('SHIFTS')
            },
            {
                to:'/invoices',
                icon:<FaFileInvoiceDollar size={20} />,
                text:applyTranslation('INVOICES')
            },
            isAdmin() && {
                to:'/projects',
                icon:<AiOutlineFolderOpen size={20} />,
                text:applyTranslation('PROJECTS'),
                hidden:!isAdmin()
            } || undefined,
            isAdmin() && {
                to:'/business',
                icon:<BsBook size={20} />,
                text:applyTranslation('BUSINESS'),
                hidden:!isAdmin()
            } || undefined,
        ],[
            {
                label:<>{applyTranslation('PERSONAL')}</>
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
        ],[
            {
                label:<>{applyTranslation('ADMIN')}</>
            },
            isAdmin() && {
                to:'/users',
                icon:<FaUsersCog size={20} />,
                text:applyTranslation('USERS'),
                hidden:!isAdmin()
            } || undefined,
        ],[
            {
                label:<>{applyTranslation('HELPDESK')}</>
            },
            {
                to:'/faq',
                icon:<FaQuestionCircle size={20} />,
                text:applyTranslation('FAQ'),
            },
            {
                to:'/contact',
                icon:<FiMail size={20} />,
                text:applyTranslation('CONTACT'),
            },
        ],[
            {
                label:<>{applyTranslation('LOGOUT')}</>
            },
            {
                to:'/logout',
                icon:<HiOutlineLogout size={20} />,
                text:applyTranslation('LOGOUT')
            },
        ]

    ]
}
