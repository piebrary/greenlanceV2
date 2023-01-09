import { useContext } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'
import { ClientContext } from '../../../custom/contexts/ClientContext'
import { FreelancerContext } from '../../../custom/contexts/FreelancerContext'

import { BiHome } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import { VscSettings } from 'react-icons/vsc'
import { FaUsersCog } from 'react-icons/fa'
import { AiOutlineFolderOpen, AiOutlineShareAlt } from 'react-icons/ai'
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
import { VscGraphLine } from 'react-icons/vsc'

export default function Menu(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)
    const { clientData } = useContext(ClientContext)
    const { freelancerData } = useContext(FreelancerContext)

    createTranslation('Menu.PROFILE', {
        en:'Profile',
        nl:'Profiel'
    })

    createTranslation('Menu.BUSINESS', {
        en:'Business',
        nl:'Bedrijf'
    })

    createTranslation('Menu.SHIFTS', {
        en:'Shifts',
        nl:'Diensten'
    })

    createTranslation('Menu.TIMESHEETS', {
        en:'Timesheets',
        nl:'Urenstaten'
    })

    createTranslation('Menu.INVOICES', {
        en:'Invoices',
        nl:'Facturen'
    })

    createTranslation('Menu.FINANCIALS', {
        en:'Financials',
        nl:'Financiele data'
    })

    createTranslation('Menu.BUSINESS_PROFILE', {
        en:'Business profile',
        nl:'Bedrijfsprofiel'
    })

    createTranslation('Menu.PROJECTS', {
        en:'Projects',
        nl:'Projecten'
    })

    createTranslation('Menu.PERSONAL', {
        en:'Personal',
        nl:'Persoonlijk'
    })

    createTranslation('Menu.PERSONAL_PROFILE', {
        en:'Personal profile',
        nl:'Persoonlijk profiel'
    })

    createTranslation('Menu.HELPDESK', {
        en:'Helpdesk',
        nl:'Helpdesk'
    })

    createTranslation('Menu.FAQ', {
        en:'Faq',
        nl:'Faq'
    })

    createTranslation('Menu.CONTACT', {
        en:'Contact',
        nl:'Contact'
    })

    createTranslation('Menu.CONNECTIONS', {
        en:'Connections',
        nl:'Connecties'
    })

    return [
        [
            {
                label:(
                    <>
                        <p>{userData.username}</p>
                        <p>{clientData?.name || freelancerData?.name}</p>
                    </>
                )
            }
        ],[
            (hasRole('freelancer') || hasRole('client')) && {
                label:<>{applyTranslation('Menu.BUSINESS')}</>
            },
            (hasRole('freelancer') || hasRole('client')) && {
                to:'/',
                icon:<BiHome size={20} />,
                text:applyTranslation('DASHBOARD')
            },
            (hasRole('freelancer') || hasRole('client')) && {
                to:'/calendar',
                icon:<BsCalendar2Week size={20} />,
                text:applyTranslation('CALENDAR')
            },
            (hasRole('freelancer') || hasRole('client')) && {
                to:'/shifts',
                icon:<AiOutlineFileDone size={20} />,
                text:applyTranslation('Menu.SHIFTS')
            },
            (hasRole('freelancer') || hasRole('client')) && {
                to:'/timesheets',
                icon:<BsClockHistory size={20} />,
                text:applyTranslation('Menu.TIMESHEETS')
            },
            (hasRole('freelancer') || hasRole('client')) && {
                to:'/invoices',
                icon:<FaFileInvoiceDollar size={20} />,
                text:applyTranslation('Menu.INVOICES')
            },
            (hasRole('freelancer') || hasRole('client')) && {
                to:'/financials',
                icon:<VscGraphLine size={20} />,
                text:applyTranslation('Menu.FINANCIALS')
            },
            (hasRole('freelancer') || hasRole('client')) && {
                to:'/business-profile',
                icon:<RiProfileLine size={20} />,
                text:applyTranslation('Menu.BUSINESS_PROFILE'),
            },
            hasRole('client') && {
                to:'/projects',
                icon:<AiOutlineFolderOpen size={20} />,
                text:applyTranslation('Menu.PROJECTS'),
            },
            (hasRole('freelancer') || hasRole('client')) && {
                to:'/connections',
                icon:<AiOutlineShareAlt size={20} />,
                text:applyTranslation('Menu.CONNECTIONS'),
            },
        ],[
            {
                label:<>{applyTranslation('Menu.PERSONAL')}</>
            },
            {
                to:'/profile',
                icon:<FaUser size={20} />,
                text:applyTranslation('Menu.PERSONAL_PROFILE')
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
                label:<>{applyTranslation('Menu.HELPDESK')}</>
            },
            {
                to:'/faq',
                icon:<FaQuestionCircle size={20} />,
                text:applyTranslation('Menu.FAQ'),
            },
            {
                to:'/contact',
                icon:<FiMail size={20} />,
                text:applyTranslation('Menu.CONTACT'),
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
