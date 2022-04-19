import { useContext } from 'react'

import { AuthenticationContext } from '../../contexts/AuthenticationContext'

import Form from '../../components/basic/form/Form'

import LogoSmall from '../../components/custom/logoSmall/LogoSmall'

import styles from './Login.module.css'

export default function Login(){

    const { authenticate } = useContext(AuthenticationContext)

    return (
        <div className={styles.container}>
            <header className={styles.header}>
            </header>
            <main className={styles.main}>
                <Form
                    logo={<LogoSmall />}
                    title={'Login'}
                    settings={{}}
                    onSubmit={data => authenticate(data.username, data.password)}
                    elements={[
                        {
                            type:'input',
                            subtype:'text',
                            label:'Username',
                            name:'username',
                            placeholder:'username',
                            rules:{
                                required: true
                            },
                        },
                        {
                            type:'input',
                            subtype:'password',
                            label:'Password',
                            name:'password',
                            placeholder:'password',
                            rules:{
                                required: true
                            }
                        },
                    ]}
                    buttons={[
                        {
                            type:'button',
                            subtype:'submit',
                            label:'Submit'
                        },
                        {
                            type:'button',
                            subtype:'reset',
                            label:'Reset'
                        },
                    ]}
                    />
            </main>
            <footer className={styles.footer}>
                PieBrary copyright 2022
            </footer>
        </div>
    )

}
