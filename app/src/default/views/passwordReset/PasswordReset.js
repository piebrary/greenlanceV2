import { useContext, useState } from 'react'
import { useSearchParams } from "react-router-dom"

import { useForm } from "react-hook-form"

import { AuthenticationContext } from '../../../default/contexts/AuthenticationContext'

import { passwordReset } from '../../../default/services/AuthenticationService'

import Form from '../../../default/components/form/Form'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import ButtonGroup from '../../../default/components/buttonGroup/ButtonGroup'

import LogoSmall from '../../../default/components/logo/Logo'
import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'

import styles from './PasswordReset.module.css'

export default function Login(){

    const { authenticate, authState } = useContext(AuthenticationContext)
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()

    const [responseError, setResponseError] = useState()

    const [searchParams, setSearchParams] = useSearchParams()

    const onSubmit = async data => {

        try {

            console.log(searchParams.get('id'))

            // const query = useQuery()
            // const id = query.get('id')
            // const token = query.get('token')
            //
            // data.id = id
            // data.token = token

            await passwordReset(data)

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
                    onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label={'Password'}
                        name={'newPassword'}
                        type={'password'}
                        passwordToggle={true}
                        customStyles={applyStyles([styles], 'customInput')}
                        register={register}
                        errors={errors}
                        rules={{
                            validate:{
                                minLength: value => {
                                    if(value.length === 0 || value.length > 7) return true
                                    return 'New password is too short'
                                },
                                minNumbers: value => {
                                    if(value.length === 0 || containsNumber(value)) return true
                                    return 'New password must contain at least one number'
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
                                    if(getValues().newPassword === getValues().repeatPassword) return true
                                    return 'Passwords don\'t match'
                                }
                            }
                        }}
                        />
                    <ButtonGroup>
                        <Button
                            customStyles={applyStyles([styles], 'customButton')}
                            label={'Reset password'}
                            type={'submit'}
                            />
                    </ButtonGroup>
                </Form>
            </main>
        </div>
    )

}
