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

    const { getTranslation, addTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    const data = []

    addTranslation('GridView.INTRO_TEXT', {
        en:'The grid component is fully customizable through CSS styles. Below are multiple grids which resize differently according to screen size.',
        nl:'De Grid module is volledig aanpasbaar via CSS stijlen. Hieronder staan meerdere Grids welke verschillend resizen afhankelijk van het browser formaat.'
    })

    return (
        <Layout
            items={menuitems({ isAdmin, getTranslation })}
            title={getTranslation('GRID')}>
            <Card>
                {getTranslation('GridView.INTRO_TEXT')}
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
            <Grid customStyles={filterStyles([styles], 'grid2')}>
                <div className={`${styles.grid2Element} ${styles.grid2Element1}`}>
                    1
                </div>
                <div className={`${styles.grid2Element} ${styles.grid2Element2}`}>
                    2
                </div>
                <div className={`${styles.grid2Element} ${styles.grid2Element3}`}>
                    3
                </div>
            </Grid>
            <Grid customStyles={filterStyles([styles], 'grid3')}>
                <div className={`${styles.grid3Element} ${styles.grid3Element1}`}>
                    1
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element2}`}>
                    2
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element3}`}>
                    3
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element4}`}>
                    4
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element5}`}>
                    5
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element6}`}>
                    6
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element7}`}>
                    7
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element8}`}>
                    8
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element9}`}>
                    9
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element10}`}>
                    10
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element11}`}>
                    11
                </div>
                <div className={`${styles.grid3Element} ${styles.grid3Element12}`}>
                    12
                </div>
            </Grid>
            <Grid customStyles={filterStyles([styles], 'grid4')}>
                <div className={`${styles.grid4Element} ${styles.grid4Element1}`}>
                    1
                </div>
                <div className={`${styles.grid4Element} ${styles.grid4Element2}`}>
                    2
                </div>
                <div className={`${styles.grid4Element} ${styles.grid4Element3}`}>
                    3
                </div>
                <div className={`${styles.grid4Element} ${styles.grid4Element4}`}>
                    4
                </div>
            </Grid>
        </Layout>
    )
}
