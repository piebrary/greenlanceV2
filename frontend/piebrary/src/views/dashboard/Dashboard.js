import { useContext } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'

import { Menu } from '../../components/custom/menu'

import styles from './Dashboard.module.css'

export default function Dashboard(){

    const { getLanguage } = useContext(LanguageContext)

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <Menu />
            </nav>
            <main className={styles.main}>
                Dashboard
            </main>
        </div>
    )
}
