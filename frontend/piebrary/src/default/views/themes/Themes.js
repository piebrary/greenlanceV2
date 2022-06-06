import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'
import { ThemeContext } from '../../contexts/ThemeContext'

import Layout from '../../components/layouts/simpleMenuLeft/Layout.js'
import Card from '../../components/card/Card.js'
import Button from '../../components/button/Button.js'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup.js'

import { menuitems } from '../../assets/js/menu/items'

import { applyStyles } from '../../utils/applyStyles'

import styles from './Themes.module.css'

export default function FormView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { isAdmin, settings } = useContext(UserContext)
    const { setTheme, getAvailableThemes } = useContext(ThemeContext)

    return (
        <Layout
            className={styles.container}
            items={menuitems({ isAdmin, applyTranslation })}
            title={applyTranslation('THEMES')}>
            <Card
                customStyles={applyStyles([styles], 'card1')}
                >
                <ButtonGroup>
                    {
                        getAvailableThemes().map(t => {

                            return (
                                    <Button
                                        key={t}
                                        label={t}
                                        onClick={() => {

                                            setTheme(t)

                                        }}
                                        />
                            )
                        })
                    }
                </ButtonGroup>
            </Card>
        </Layout>
    )
}
