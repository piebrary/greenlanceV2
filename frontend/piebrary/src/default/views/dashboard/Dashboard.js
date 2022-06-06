import { useContext } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Grid from '../../components/grid/Grid'
import Button from '../../components/button/Button'
import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'

import Logo from '../../components/logo/Logo'

import { menuitems } from '../../assets/js/menu/items'

import { applyStyles } from '../../utils/applyStyles'

import styles from './Dashboard.module.css'

export default function Dashboard(){

    const { applyTranslation } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    return (
        <Layout
            className={styles.container}
            items={menuitems({ isAdmin, applyTranslation })}
            title={applyTranslation('DASHBOARD')}>
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
