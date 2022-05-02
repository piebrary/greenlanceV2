import { useContext } from 'react'

import { useForm } from "react-hook-form"

import { AuthenticationContext } from '../../contexts/AuthenticationContext'

import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'

import LogoSmall from '../../components/logo/Logo'
import { filterStyles } from '../../utils/filterStyles'

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
                    customStyles={filterStyles([styles], 'customLogo')}/>
                <Form
                    onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label={'Username'}
                        name={'username'}
                        subtype={'text'}
                        customStyles={filterStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        rules={{
                            required: 'Username is required'
                        }}
                        />
                    <Input
                        label={'Password'}
                        name={'password'}
                        subtype={'password'}
                        customStyles={filterStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        rules={{
                            required: 'Password is required'
                        }}
                        />
                    <ButtonGroup>
                        <Button
                            label={'Login'}
                            type={'submit'}
                            />
                    </ButtonGroup>
                </Form>
            </main>
            <footer className={styles.footer}>
                PieBrary copyright 2022
            </footer>
        </div>
    )

}
