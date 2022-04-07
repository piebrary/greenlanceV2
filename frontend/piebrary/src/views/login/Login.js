import { useContext, useState } from 'react'

import { useForm } from "react-hook-form"

import { AuthenticationContext } from '../../contexts/AuthenticationContext'

import Container from '../../components/containers/container2/Container'
import Button from '../../components/buttons/button1/Button'
import Input from '../../components/forms/input1/Input'
import Spacer from '../../components/spacer/Spacer'
import Textbox from '../../components/textboxes/textbox1/Textbox'
import Logo from '../../components/logos/logo1/Logo'

import styles from './Login.module.css'

import { BiHomeAlt } from 'react-icons/bi'

export default function Login(){

    const { handleSubmit } = useForm()

    const { authenticate } = useContext(AuthenticationContext)

    const [loginUsernameValue, setLoginUsernameValue] = useState("")
    const [loginPasswordValue, setLoginPasswordValue] = useState("")

    async function handleLogin(){
        authenticate(loginUsernameValue, loginPasswordValue)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Logo roundedBottom bold />
                <Textbox bold nonSelect>Log in</Textbox>
            </div>
            <div className={styles.content}>
                <div className={styles.contentLogo}>
                    <Logo roundedBottom roundedTop bold doubleLine/>
                </div>
                <Container centered>
                    <div className={styles.loginContainer}>
                        <div className={styles.contentHeader}>
                            <div style={{ lineHeight:'40px' }}>Log in</div>
                            <BiHomeAlt size={30}/>
                        </div>
                        <Spacer h={'10px'} />
                        <form onSubmit={handleSubmit(handleLogin)} id="login">
                            <Input
                                name="loginUsername"
                                type="text"
                                placeholder="username"
                                value={loginUsernameValue}
                                onChange={e => setLoginUsernameValue(e.target.value)}
                                centered
                                small
                                />
                            <Spacer h={'20px'} />
                            <Input
                                name="loginPassword"
                                type="password"
                                placeholder="password"
                                value={loginPasswordValue}
                                onChange={e => setLoginPasswordValue(e.target.value)}
                                centered
                                small
                                />
                            <Spacer h={'20px'} />
                            <Button
                                type="submit"
                                bold
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
            <div className={styles.footer}>
                Greenlance BV | Klein Grachtje 5 8021 JD Zwolle | info@greenlance.nl | KVK 12345678
            </div>
        </div>
    )

}
