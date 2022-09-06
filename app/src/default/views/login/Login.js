import { useContext } from 'react'

import { useForm } from "react-hook-form"

import { AuthenticationContext } from '../../contexts/AuthenticationContext'

import Form from '../../components/form/Form'
import Input from '../../components/formElements/input/Input'
import Button from '../../components/button/Button'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'

import LogoSmall from '../../components/logo/Logo'
import { applyStyles } from '../../utils/applyStyles'

import styles from './Login.module.css'

export default function Login(){

    const { authenticate } = useContext(AuthenticationContext)

    const { register, handleSubmit, formState: { errors } } = useForm()


        // logo={<LogoSmall />}
        // title={'Log in'}
        // settings={{}}

    const onSubmit = (data) => {

        authenticate(data.username, data.password)

    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
            </header>
            <main className={styles.main}>
                <LogoSmall
                    customStyles={applyStyles([styles], 'customLogo')}/>
                <Form
                    onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label={'Username'}
                        name={'username'}
                        subtype={'text'}
                        customStyles={applyStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        rules={{
                            required: 'Username is required'
                        }}
                        />
                    <Input
                        label={'Password'}
                        name={'password'}
                        type={'password'}
                        passwordToggle={true}
                        customStyles={applyStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        rules={{
                            required: 'Password is required'
                        }}
                        />
                    <ButtonGroup>
                        <Button
                            customStyles={applyStyles([styles], 'customButton')}
                            label={'Login'}
                            type={'submit'}
                            />
                    </ButtonGroup>
                    <div
                        className={styles.underMenu}
                        >
                        <a href={'/register'}>Register</a>
                        <a href={'/forgot password'}>Forgot password</a>
                    </div>
                </Form>
            </main>
        </div>
    )

}
