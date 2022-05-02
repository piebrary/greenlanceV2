import { useContext } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Grid from '../../components/grid/Grid'
import Button from '../../components/button/Button'
import Layout from '../../components/layouts/simpleMenuLeft/Layout.js'
import Card from '../../components/card/Card.js'

import { menuitems } from '../../assets/js/menu/items'

import { filterStyles } from '../../utils/filterStyles'

import styles from './Form.module.css'

export default function Form(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin } = useContext(UserContext)

    return (
        <Layout
            className={styles.container}
            menuitems={menuitems({ isAdmin, translate })}
            pageTitle={'Form'}>
            <Card
                title={'Form component'}
                customStyles={filterStyles([styles], 'card1')}>
                The form component can be used to quickly build forms. It supports all normal form elements.
                <br />
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
        </Layout>
    )
}
