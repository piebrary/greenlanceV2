import { useContext } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'

import styles from './Users.module.css'

export default function Users(){

    const { translate } = useContext(LanguageContext)

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
            </nav>
            <main className={styles.main}>
                Users
            </main>
        </div>
    )
}
