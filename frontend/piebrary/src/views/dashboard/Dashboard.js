import { useContext } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Grid from '../../components/basic/grid/Grid'
import Button from '../../components/basic/button/Button'
import Layout from '../../components/basic/layouts/simpleMenuLeft/Layout'
import Card from '../../components/basic/card/Card'

import LogoSmall from '../../components/custom/logoSmall/LogoSmall'

import { menuitems } from '../../assets/js/menu/items'

import { filterStyles } from '../../utils/filterStyles'

import styles from './Dashboard.module.css'

export default function Dashboard(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    return (
        <Layout
            className={styles.container}
            menuitems={menuitems({ isAdmin, translate })}
            pageTitle={translate('DASHBOARD')}>
            <Card
                title={'Grid component'}
                customStyles={filterStyles([styles], 'card1')}
                onClick={event => alert('You clicked on a card component!')}>
                This page uses the Grid component. <br />
                <br />
                This component resizes with screen resizes if the correct properties and styles are given.

            </Card>
            <Grid customStyles={filterStyles([styles], 'grid1')}>
                <Card
                    customStyles={filterStyles([styles], 'griditemOne')}>
                    One
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemTwo')}>
                    Two
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemThree')}
                    title={'Three'}>
                    Three
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemFour')}>
                    Four
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemFive')}
                    title={'Five'}>
                    Five
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemSix')}>
                    Six
                </Card>
            </Grid>
            <Card
                title={'Grid component'}>

                <Button
                    label={'testButton'}
                    customStyles={filterStyles([styles], 'button1')}
                    onClick={event => console.log(event, 'test')}/>

            </Card>
            <Grid customStyles={filterStyles([styles], 'grid1')}>
                <Card
                    customStyles={filterStyles([styles], 'griditemOne')}>
                    One
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemTwo')}>
                    Two
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemThree')}
                    title={'Three'}>
                    Three
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemFour')}>
                    Four
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemFive')}
                    title={'Five'}>
                    Five
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemSix')}>
                    Six
                </Card>
            </Grid>
            <Grid customStyles={filterStyles([styles], 'grid1')}>
                <Card
                    customStyles={filterStyles([styles], 'griditemOne')}>
                    One
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemTwo')}>
                    Two
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemThree')}
                    title={'Three'}>
                    Three
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemFour')}>
                    Four
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemFive')}
                    title={'Five'}>
                    Five
                </Card>
                <Card
                    customStyles={filterStyles([styles], 'griditemSix')}>
                    Six
                </Card>
            </Grid>
        </Layout>
    )
}




// items={[
//     {
//         customStyles:filterStyles([styles], 'item1'),
//         element:
//     }
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'1/3', gridRow:1 }}
//         customStyles={filterStyles([styles], 'item1')}
//         key={1}
//         >
//         One
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'2/4', gridRow:'1/3' }}
//         customStyles={filterStyles([styles], 'item1')}
//         key={2}
//         >
//         Two
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'1', gridRow:'2/5' }}
//         customStyles={filterStyles([styles], 'item1')}
//         key={3}
//         >
//         Three
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'3', gridRow:'3' }}
//         customStyles={filterStyles([styles], 'item1')}
//         key={4}
//         >
//         Four
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'2', gridRow:'4' }}
//         customStyles={filterStyles([styles], 'item1')}
//         key={5}
//         >
//         Five
//     </p>,
//     <p
//         className={styles.griditem}
//         style={{ gridColumn:'3', gridRow:'4' }}
//         customStyles={filterStyles([styles], 'item1')}
//         key={6}
//         >
//         Six
//     </p>
// ]}
// />
