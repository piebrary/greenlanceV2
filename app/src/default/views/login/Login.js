import { useContext, useState } from 'react'

import { useForm } from "react-hook-form"

import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import Form from '../../../default/components/form/Form'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import ButtonGroup from '../../../default/components/buttonGroup/ButtonGroup'

import LogoSmall from '../../../default/components/logo/Logo'
import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Login.module.css'

export default function Login(){

    const { authenticate, authState } = useContext(AuthenticationContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [authFailed, setAuthFailed] = useState(false)

    const onSubmit = async data => {

        const result = await authenticate(data.username, data.password)

        if(result){

            setAuthFailed(false)

        }

        if(!result){

            setAuthFailed(true)

        }

    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
            </header>
            <main className={styles.main}>
                <LogoSmall
                    customStyles={applyStyles([styles], 'customLogo')}/>
                <Form
                    onSubmit={onSubmit}
                    >
                    <Input
                        label={'Username'}
                        name={'username'}
                        subtype={'text'}
                        customStyles={applyStyles([styles], 'customInput')}
                        shouldRegister
                        required
                        />
                    <Input
                        label={'Password'}
                        name={'password'}
                        type={'password'}
                        passwordToggle
                        customStyles={applyStyles([styles], 'customInput')}
                        shouldRegister
                        required
                        />
                    {authFailed && <div className={styles.loginFailed}>Login failed, your username or password may be incorrect.</div>}
                    <div
                        className={styles.underMenu}
                        >
                        {process.env.REACT_APP_ENABLE_PUBLIC_REGISTRATION && <a href={'/register'}>Register</a>}
                        <a href={'/passwordResetRequest'}>Reset password</a>
                    </div>
                </Form>
            </main>
        </div>
    )

}

// rules={{
//     required: 'Email is required'
// }}
//
// rules={{
//     required: 'Password is required'
// }}
