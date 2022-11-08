import { useContext, useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Layout from '../../../default/components/layouts/basic/Layout'
import Controls from '../../../default/components/controls/Controls'

import { menuitems } from '../../../default/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'

import styles from './Builder.module.css'

export default function Builder(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    createTranslation('DocumentationView.INTRO', {
        en:`A comprehensive documentation is included. This documentation is updated regularly when an update is available through PieBrary updates. It provides developers working with PieBrary the necessary handles to develop a solid product fast and easy with the lowest change of bugs.`,
        nl:'Een uitgebreide documentatie is inbegrepen. Deze documentatie wordt regelmatig geupdate wanneer door middel van PieBrary updates. Het document bbiedt ontwikkelaars die werken met PieBrary de noodzakelijke handvatten om een degelijk product snel en gemakkelijk te kunnen bouwen, waarbij het risico op bugs zo laag mogelijk wordt gehouden.'
    })

    return (
        <Layout
            items={menuitems({ userData, hasRole, applyTranslation })}
            title={applyTranslation('Builder')}
            controls={<Controls />}
            >
            <div
                className={styles.message}
                >
                Coming soon
            </div>
        </Layout>
    )
}
