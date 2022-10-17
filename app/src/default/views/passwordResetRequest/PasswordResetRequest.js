import { useContext, useState } from 'react'

import { useForm } from "react-hook-form"

import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import { passwordResetRequest } from '../../../default/services/AuthenticationService'

import Form from '../../../default/components/form/Form'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import ButtonGroup from '../../../default/components/buttonGroup/ButtonGroup'

import LogoSmall from '../../../default/components/logo/Logo'

import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'

import styles from './PasswordResetRequest.module.css'

export default function PasswordResetRequest(){

    const { authenticate, authState } = useContext(AuthenticationContext)

    const [responseError, setResponseError] = useState()
    const [resetRequested, setResetRequested] = useState(false)

    const onSubmit = async data => {

        try {

            await passwordResetRequest(data)
            setResetRequested(true)

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
                {
                    !resetRequested && (
                        <Form
                            onSubmit={onSubmit}>
                            <Input
                                label={'Email'}
                                name={'email'}
                                type={'text'}
                                customStyles={applyStyles([styles], 'customInput')}
                                shouldRegister
                                required
                                />
                            <div
                                className={styles.underMenu}
                                >
                                <a href={'/login'}>Cancel</a>
                            </div>
                        </Form>
                    )
                }
                {
                    resetRequested && (
                        <>
                            Your password reset has ben requested, check your email!
                        </>
                    )
                }
            </main>
        </div>
    )

}
