import { useContext, useState } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import { LoginSchema } from '../../schemas/Login'

import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import FormControls from '../../../default/components/formElements/formControls/FormControls'

import LogoSmall from '../../../default/components/logo/Logo'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Login.module.css'

export default function Login(){

    const { authenticate, authState } = useContext(AuthenticationContext)
    const [authFailed, setAuthFailed] = useState(false)

    const defaultValues = {
        username:'',
        password:''
    }

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState:{
            errors
        },
    } = useForm({
        defaultValues,
        resolver: yupResolver(LoginSchema, { abortEarly: false }),
        criteriaMode: 'all',
        mode: 'onTouched',
    })

    const onSubmit = async data => {

        console.log(data)

        const result = await authenticate(data.username, data.password)

        if(result){

            setAuthFailed(false)

        }

        if(!result){

            setAuthFailed(true)

        }

    }

    const handleReset = event => {

        event && event.preventDefault()

        reset()


    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
            </header>
            <main className={styles.main}>
                <LogoSmall
                    customStyles={applyStyles([styles], 'customLogo')}/>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={styles.form}
                    >
                    <Input
                        label={'Username'}
                        name={'username'}
                        subtype={'text'}
                        customStyles={applyStyles([styles], 'customInput')}
                        errors={errors}
                        register={register}
                        required
                        />
                    <Input
                        label={'Password'}
                        name={'password'}
                        type={'password'}
                        passwordToggle
                        customStyles={applyStyles([styles], 'customInput')}
                        errors={errors}
                        register={register}
                        required
                        />
                    {authFailed && <div className={styles.loginFailed}>Login failed, your username or password may be incorrect.</div>}
                    <FormControls
                        handleReset={handleReset}
                        />
                </form>
                <div
                    className={styles.underMenu}
                    >
                    {process.env.REACT_APP_ENABLE_PUBLIC_REGISTRATION && <a href={'/register'}>Register</a>}
                    <a href={'/passwordResetRequest'}>Reset password</a>
                </div>
            </main>
        </div>
    )

}
