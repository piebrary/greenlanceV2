import { useContext, useState } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"

import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import { passwordReset } from '../../../default/services/AuthenticationService'

import Form from '../../../default/components/form/Form'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'

import LogoSmall from '../../../default/components/logo/Logo'
import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'

import styles from './PasswordReset.module.css'

export default function Login(){

    const { authenticate, authState } = useContext(AuthenticationContext)

    const [responseError, setResponseError] = useState()

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const onSubmit = async data => {

        try {

            data.id = searchParams.get('id')
            data.token = searchParams.get('token')

            await passwordReset(data)

            navigate('/')

        } catch (error) {

            console.log(error.response)
            setResponseError(error.response.data)

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
                    onSubmit={onSubmit}>
                    <Input
                        label={'New password'}
                        name={'newPassword'}
                        type={'password'}
                        passwordToggle
                        customStyles={applyStyles([styles], 'customInput')}
                        shouldRegister
                        />
                    <Input
                        label={'Repeat password'}
                        name={'repeatPassword'}
                        type={'password'}
                        passwordToggle
                        customStyles={applyStyles([styles], 'customInput')}
                        shouldRegister
                        />
                </Form>
            </main>
        </div>
    )

}
// rules={{
//     validate:{
//         minLength: value => {
//             if(value.length === 0 || value.length > 7) return true
//             return 'New password is too short'
//         },
//         minNumbers: value => {
//             if(value.length === 0 || containsNumber(value)) return true
//             return 'New password must contain at least one number'
//         }
//     }
// }}
// rules={{
//     validate:{
//         passwordsMatch: () => {
//             if(getValues().newPassword === getValues().repeatPassword) return true
//             return 'Passwords don\'t match'
//         }
//     }
// }}
