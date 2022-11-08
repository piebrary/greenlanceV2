import { useContext } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Grid from '../../../default/components/grid/Grid'
import Button from '../../../default/components/button/Button'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Controls from '../../../default/components/controls/Controls'

import Logo from '../../../custom/components/logo/Logo'

import { menuitems } from '../../../custom/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Dashboard.module.css'

export default function Dashboard(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, hasRole, applyTranslation })}
            title={applyTranslation('DASHBOARD')}
            logo={<Logo />}
            controls={<Controls />}
            >
            <Card
                title={'Grid component'}
                customStyles={applyStyles([styles], 'card1')}
                onClick={event => alert('You clicked on a card component!')}>
                This page uses the Grid component. <br />
                <br />
                This component resizes with screen resizes if the correct properties and styles are given.

            </Card>
            <Grid customStyles={applyStyles([styles], 'grid1')}>
                <Card
                    customStyles={applyStyles([styles], 'griditemOne')}>
                    One
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemTwo')}>
                    Two
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemThree')}
                    title={'Three'}>
                    Three
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemFour')}>
                    Four
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemFive')}
                    title={'Five'}>
                    Five
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemSix')}>
                    Six
                </Card>
            </Grid>
            <Card
                title={'Grid component'}
                description={'This is a description'}>
                This is the body
            </Card>
            <Grid customStyles={applyStyles([styles], 'grid1')}>
                <Card
                    customStyles={applyStyles([styles], 'griditemOne')}>
                    One
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemTwo')}>
                    Two
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemThree')}
                    title={'Three'}>
                    Three
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemFour')}>
                    Four
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemFive')}
                    title={'Five'}>
                    Five
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemSix')}>
                    Six
                </Card>
            </Grid>
            <Grid customStyles={applyStyles([styles], 'grid1')}>
                <Card
                    customStyles={applyStyles([styles], 'griditemOne')}>
                    One
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemTwo')}>
                    Two
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemThree')}
                    title={'Three'}>
                    Three
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemFour')}>
                    Four
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemFive')}
                    title={'Five'}>
                    Five
                </Card>
                <Card
                    customStyles={applyStyles([styles], 'griditemSix')}>
                    Six
                </Card>
            </Grid>
        </Layout>
    )
}




// items={[
//     {
//         customStyles:applyStyles([styles], 'item1'),
//         element:
//     }
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'1/3', gridRow:1 }}
//         customStyles={applyStyles([styles], 'item1')}
//         key={1}
//         >
//         One
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'2/4', gridRow:'1/3' }}
//         customStyles={applyStyles([styles], 'item1')}
//         key={2}
//         >
//         Two
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'1', gridRow:'2/5' }}
//         customStyles={applyStyles([styles], 'item1')}
//         key={3}
//         >
//         Three
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'3', gridRow:'3' }}
//         customStyles={applyStyles([styles], 'item1')}
//         key={4}
//         >
//         Four
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'2', gridRow:'4' }}
//         customStyles={applyStyles([styles], 'item1')}
//         key={5}
//         >
//         Five
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'3', gridRow:'4' }}
//         customStyles={applyStyles([styles], 'item1')}
//         key={6}
//         >
//         Six
//     </p>
// ]}
// />
