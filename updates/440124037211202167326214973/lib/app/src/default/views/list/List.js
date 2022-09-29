import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import List from '../../../default/components/list/List'

import { menuitems } from '../../../default/assets/js/menu/items'
import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './List.module.css'

import { MdOtherHouses } from 'react-icons/md'
import { GiBurningDot } from 'react-icons/gi'
import { AiOutlineAudio } from 'react-icons/ai'
import { AiOutlineBug } from 'react-icons/ai'
import { FaIcons } from 'react-icons/fa'
import { RiVidicon2Fill } from 'react-icons/ri'

export default function ListView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, isAdmin } = useContext(UserContext)

    const items = []

    createTranslation('ListView.description', {
        en:'The list component can be used to easily create lists with different options. Choose between an ordered or unordered list or pick your own icon! The items can be clicked, have a nice hover effect and can be fully customized.',
        nl:'De lijst component kan gebruikt worden om makkelijk en snel lijsten te maken en te configureren door middel van verschillende opties. Kies voor een georganiseerde- of ongeorganiseerde lijst of kies je eigen icoon! Lijstopties kunnen worden aangeklikt, hebben een mooi hover effect en zijn voolledig aan te passen door middel van css!'
    })

    createTranslation('ListView.Unordered_list', {
        en:'Unordered list',
        nl:'Ongeorganiseerde lijst'
    })

    createTranslation('ListView.Unordered_list_clickable', {
        en:'Unordered list with clickable items',
        nl:'Ongeorganiseerde lijst met klikbare opties'
    })

    createTranslation('ListView.Ordered_list', {
        en:'Ordered list',
        nl:'Georganiseerde lijst'
    })

    createTranslation('ListView.Icon_list', {
        en:'List with icons',
        nl:'Lijst met icoontjes'
    })

    createTranslation('ListView.Item', {
        en:'Item ',
        nl:'Item '
    })

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('LIST')}>
            <Card>
                {applyTranslation('ListView.description')}
            </Card>
            <Card
                title={applyTranslation('ListView.Unordered_list')}
                >
                <List
                    bullets={'unordered'}
                    items={[
                        { text:applyTranslation('ListView.Item') + '1' },
                        { text:applyTranslation('ListView.Item') + '2' },
                        { text:applyTranslation('ListView.Item') + '3' },
                        { text:applyTranslation('ListView.Item') + '4' },
                        { text:applyTranslation('ListView.Item') + '5' },
                        { text:applyTranslation('ListView.Item') + '6' },
                        { text:applyTranslation('ListView.Item') + '7' },
                        { text:applyTranslation('ListView.Item') + '8' },
                        { text:applyTranslation('ListView.Item') + '9' },
                        { text:applyTranslation('ListView.Item') + '10' },
                        { text:applyTranslation('ListView.Item') + '11' },
                        { text:applyTranslation('ListView.Item') + '12' },
                    ]}
                    />
            </Card>
            <Card
                title={applyTranslation('ListView.Unordered_list_clickable')}
                >
                <List
                    bullets={'unordered'}
                    items={[
                        {
                            text:applyTranslation('ListView.Item') + '1',
                            onClick:() => alert(applyTranslation('ListView.Item') + ' 1 has been clicked!')
                        },
                        {
                            text:applyTranslation('ListView.Item') + '2',
                            onClick:() => alert(applyTranslation('ListView.Item') + '2 has been clicked!')
                        },
                        {
                            text:applyTranslation('ListView.Item') + '3',
                            onClick:() => alert(applyTranslation('ListView.Item') + '3 has been clicked!')
                        },
                        {
                            text:applyTranslation('ListView.Item') + '4',
                            onClick:() => alert(applyTranslation('ListView.Item') + '4 has been clicked!')
                        },
                        {
                            text:applyTranslation('ListView.Item') + '5',
                            onClick:() => alert(applyTranslation('ListView.Item') + '5 has been clicked!')
                        },
                        {
                            text:applyTranslation('ListView.Item') + '6',
                            onClick:() => alert(applyTranslation('ListView.Item') + '6 has been clicked!')
                        },
                    ]}
                    />
            </Card>
            <Card
                title={applyTranslation('ListView.Ordered_list')}
                >
                <List
                    bullets={'ordered'}
                    items={[
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                        { text:applyTranslation('ListView.Item') },
                    ]}
                    />
            </Card>
            <Card
                title={applyTranslation('ListView.Icon_list')}
                >
                <List
                    items={[
                        {
                            text:'House icon',
                            icon:<MdOtherHouses size={30} />,
                            onClick:() => alert('The house has been clicked!')
                        },
                        {
                            text:'Comet icon',
                            icon:<GiBurningDot size={30} />,
                            onClick:() => alert('The comet has been clicked!')
                        },
                        {
                            text:'Microphone icon',
                            icon:<AiOutlineAudio size={30} />,
                            onClick:() => alert('The microphone has been clicked!')
                        },
                        {
                            text:'Bug icon',
                            icon:<AiOutlineBug size={30} />,
                            onClick:() => alert('The bug has been clicked!')
                        },
                        {
                            text:'Random icons',
                            icon:<FaIcons size={30} />,
                            onClick:() => alert('The random icons have been clicked!')
                        },
                        {
                            text:'Camera icon',
                            icon:<RiVidicon2Fill size={30} />,
                            onClick:() => alert('The camera icon has been clicked!')
                        },
                    ]}
                    />
            </Card>
        </Layout>
    )
}
