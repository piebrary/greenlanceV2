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
import { RiProfileLine } from 'react-icons/ri'
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
import { AiOutlineFileDone } from 'react-icons/ai'

export function menuitems({ userData, hasRole, applyTranslation, createTranslation }){

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
            (hasRole('freelancer') || hasRole('business')) && {
                to:'/shifts',
                icon:<AiOutlineFileDone size={20} />,
                text:applyTranslation('SHIFTS')
            },
            (hasRole('freelancer') || hasRole('business')) && {
                to:'/invoices',
                icon:<FaFileInvoiceDollar size={20} />,
                text:applyTranslation('INVOICES')
            },
            (hasRole('freelancer') || hasRole('business')) && {
                to:'/timesheets',
                icon:<BsClockHistory size={20} />,
                text:applyTranslation('TIMESHEETS')
            },
            hasRole('business') && {
                to:'/projects',
                icon:<AiOutlineFolderOpen size={20} />,
                text:applyTranslation('PROJECTS'),
            } || undefined,
            (hasRole('freelancer') || hasRole('business')) && {
                to:'/business',
                icon:<RiProfileLine size={20} />,
                text:applyTranslation('BUSINESS PROFILE'),
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
            hasRole('admin') && {
                label:<>{applyTranslation('ADMIN')}</>
            },
            hasRole('admin') && {
                to:'/users',
                icon:<FaUsersCog size={20} />,
                text:applyTranslation('USERS'),
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
