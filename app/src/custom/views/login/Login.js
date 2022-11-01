import { useContext, useState } from 'react'

import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import { passwordResetRequest } from '../../../default/services/AuthenticationService'

import { LoginSchema } from '../../../default/schemas/Login'
import { RegisterSchema } from '../../../default/schemas/Register'
import { PasswordResetRequestSchema } from '../../../default/schemas/PasswordResetRequest'

import Form from '../../../default/components/form/Form'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'

import LogoSmall from '../../../custom/components/logo/Logo'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Login.module.css'

export default function Login(){

    const { authenticate, authState, register } = useContext(AuthenticationContext)

    const [authFailed, setAuthFailed] = useState(false)
    const [curView, setCurView] = useState('login')

    const onLogin = async data => {

        const result = await authenticate(data.username, data.password)

        if(result){

            setAuthFailed(false)

        }

        if(!result){

            setAuthFailed(true)

        }

    }

    const onRegister = async data => {

        try {

            await register(data)
            await authenticate(data.username, data.password)

        } catch (error) {

            console.log(error.response || error)

        }

    }

    const onPasswordResetRequest = async data => {

        try {

            await passwordResetRequest(data)
            setCurView('passwordResetRequested')

        } catch (error) {

            console.log(error.response || error)

        }

    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
            </header>
            <main className={styles.main}>
                <LogoSmall
                    customStyles={applyStyles([styles], 'customLogo')}/>
                {
                    curView === 'login' && (
                        <>
                            <Form
                                onSubmit={onLogin}
                                validationSchema={LoginSchema}
                                >
                                Login
                                <Input
                                    label={'Username'}
                                    name={'username'}
                                    shouldRegister
                                    required
                                    />
                                <Input
                                    label={'Password'}
                                    name={'password'}
                                    type={'password'}
                                    passwordToggle
                                    shouldRegister
                                    required
                                    />
                                {authFailed && <div className={styles.loginFailed}>Login failed, your username or password may be incorrect.</div>}
                            </Form>
                            <div
                                className={styles.underMenu}
                                >
                                {
                                    process.env.REACT_APP_ENABLE_PUBLIC_REGISTRATION && (
                                        <span onClick={() => setCurView('register')}>Register</span>
                                    )
                                }
                                <span onClick={() => setCurView('passwordResetRequest')}>Reset password</span>
                            </div>
                        </>
                    )
                }
                {
                    curView === 'register' && (
                        <>
                            <Form
                                onSubmit={onRegister}
                                validationSchema={RegisterSchema}
                                >
                                Register
                                <Input
                                    label={'Username'}
                                    name={'username'}
                                    shouldRegister
                                    required
                                    />
                                <Input
                                    label={'Email'}
                                    name={'email'}
                                    shouldRegister
                                    required
                                    />
                                <Input
                                    label={'Password'}
                                    name={'password'}
                                    type={'password'}
                                    passwordToggle
                                    shouldRegister
                                    required
                                    />
                                <Input
                                    label={'Repeat password'}
                                    name={'repeatPassword'}
                                    type={'password'}
                                    passwordToggle
                                    shouldRegister
                                    required
                                    />
                            </Form>
                            <div
                                className={styles.underMenu}
                                >
                                <span onClick={() => setCurView('login')}>Cancel</span>
                            </div>
                        </>
                    )
                }
                {
                    curView === 'passwordResetRequest' && (
                        <>
                            <Form
                                onSubmit={onRegister}
                                validationSchema={PasswordResetRequestSchema}
                                >
                                Request password reset
                                <Input
                                    label={'Email'}
                                    name={'email'}
                                    shouldRegister
                                    required
                                    />
                            </Form>
                            <div
                                className={styles.underMenu}
                                >
                                <span onClick={() => setCurView('login')}>Cancel</span>
                            </div>
                        </>
                    )
                }
                {
                    curView === 'passwordResetRequested' && (
                        <>
                            Your password reset has ben requested, check your email!
                        </>
                    )
                }
            </main>
        </div>
    )

}
