import { useContext, useState } from 'react'

import { useForm } from "react-hook-form"

import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import { register as registerUser } from '../../../default/services/AuthenticationService'

import Form from '../../../default/components/form/Form'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'

import LogoSmall from '../../../default/components/logo/Logo'

import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'

import styles from './Register.module.css'

export default function Register(){

    const { authenticate, authState } = useContext(AuthenticationContext)
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()

    const [responseError, setResponseError] = useState()

    const onSubmit = async data => {

        try {

            await registerUser(data)
            await authenticate(data.username, data.password)

        } catch (error) {

            console.log(error.response || error)
            // setResponseError(error.response.data)

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
                            required: 'Username is required'
                        }}
                        />
                    {responseError && Object.keys(responseError.data)[0] === 'username' && <div className={styles.loginFailed}>{responseError.message}</div>}
                    <Input
                        label={'Email'}
                        name={'email'}
                        type={'text'}
                        customStyles={applyStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        rules={{
                            required: 'Email is required'
                        }}
                        />
                    {responseError && Object.keys(responseError.data)[0] === 'email' && <div className={styles.loginFailed}>{responseError.message}</div>}
                    <Input
                        label={'Password'}
                        name={'password'}
                        type={'password'}
                        passwordToggle={true}
                        customStyles={applyStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        rules={{
                            validate:{
                                minLength: value => {
                                    if(value.length === 0 || value.length > 7) return true
                                    return 'Password must be 8 characters minimal'
                                },
                                minNumbers: value => {
                                    if(value.length === 0 || containsNumber(value)) return true
                                    return 'Password must contain at least one number'
                                }
                            }
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
                            validate:{
                                passwordsMatch: () => {
                                    if(getValues().password === getValues().repeatPassword) return true
                                    return 'Passwords don\'t match'
                                }
                            }
                        }}
                        />
                    <Button
                        customStyles={applyStyles([styles], 'customButton')}
                        label={'Register'}
                        type={'submit'}
                        />
                    <div
                        className={styles.underMenu}
                        >
                        <a href={'/login'}>Cancel</a>
                    </div>
                </Form>
            </main>
        </div>
    )

}
