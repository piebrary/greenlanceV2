import { useContext } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'

import styles from './Settings.module.css'

export default function Settings(){

    const { translate } = useContext(LanguageContext)

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
            </nav>
            <main className={styles.main}>
                Settings
            </main>
        </div>
    )
}
