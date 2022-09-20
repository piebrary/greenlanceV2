import { useContext, useState } from 'react'

import { useForm } from "react-hook-form"

import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import { postUserPublic } from '../../../default/services/UserService'

import Form from '../../../default/components/form/Form'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import ButtonGroup from '../../../default/components/buttonGroup/ButtonGroup'

import LogoSmall from '../../../default/components/logo/Logo'
import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Register.module.css'

export default function Register(){

    const { authenticate, authState } = useContext(AuthenticationContext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async data => {

        try {

            await postUserPublic(data)
            await authenticate(data.username, data.password)

        } catch (error) {

            console.log(error)

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
                    onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label={'Username'}
                        name={'username'}
                        subtype={'text'}
                        customStyles={applyStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        rules={{
                            required: 'Email is required'
                        }}
                        />
                    <Input
                        label={'Email'}
                        name={'email'}
                        type={'text'}
                        passwordToggle={true}
                        customStyles={applyStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        rules={{
                            required: 'Email is required'
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
                    <Input
                        label={'Repeat password'}
                        name={'repeatPassword'}
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
                            label={'Register'}
                            type={'submit'}
                            />
                    </ButtonGroup>
                    <div
                        className={styles.underMenu}
                        >
                    </div>
                </Form>
            </main>
        </div>
    )

}
