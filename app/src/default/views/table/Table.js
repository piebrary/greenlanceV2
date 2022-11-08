import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'
import { VisualsContext } from '../../../default/contexts/VisualsContext'

import Layout from '../../../default/components/layouts/basic/Layout.js'
import Card from '../../../default/components/card/Card.js'
import Button from '../../../default/components/button/Button.js'
import Grid from '../../../default/components/grid/Grid.js'
import Controls from '../../../default/components/controls/Controls'

import { menuitems } from '../../../default/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Table.module.css'

export default function TableView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole, settings } = useContext(UserContext)

    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, hasRole, applyTranslation })}
            title={applyTranslation('THEMES')}
            controls={<Controls />}
            >
            TEST
        </Layout>
    )
}
