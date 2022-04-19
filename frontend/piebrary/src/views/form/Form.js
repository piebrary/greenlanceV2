import { useContext } from 'react'

import { LanguageContext } from '../../contexts/LanguageContext'

import styles from './Form.module.css'

export default function Form(){

    const { translate } = useContext(LanguageContext)

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
            </nav>
            <main className={styles.main}>
                Form
            </main>
        </div>
    )
}
