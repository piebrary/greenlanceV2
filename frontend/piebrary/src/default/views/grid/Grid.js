import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Grid from '../../components/grid/Grid'

import { menuitems } from '../../assets/js/menu/items'
import { filterStyles } from '../../utils/filterStyles'

import styles from './Grid.module.css'

export default function GridView(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const data = []

    return (
        <Layout
            items={menuitems({ isAdmin, translate })}
            title={translate('GRID')}>
            <Card
                title={'Fully configurable Grid'}
                >
                The grid component is fully customizable through CSS modules. Below are different grids which resize differently according to screen size.
            </Card>
            <Grid customStyles={filterStyles([styles], 'grid1')}>
                <div className={`${styles.grid1Element} ${styles.grid1Element1}`}>
                    1
                </div>
                <div className={`${styles.grid1Element} ${styles.grid1Element2}`}>
                    2
                </div>
                <div className={`${styles.grid1Element} ${styles.grid1Element3}`}>
                    3
                </div>
                <div className={`${styles.grid1Element} ${styles.grid1Element4}`}>
                    4
                </div>
                <div className={`${styles.grid1Element} ${styles.grid1Element5}`}>
                    5
                </div>
                <div className={`${styles.grid1Element} ${styles.grid1Element6}`}>
                    6
                </div>
            </Grid>
        </Layout>
    )
}
