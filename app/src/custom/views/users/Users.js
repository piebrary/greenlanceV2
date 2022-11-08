import { useContext, useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'
import { RolesContext } from '../../../default/contexts/RolesContext'
import { VisualsContext } from '../../../default/contexts/VisualsContext'

import Form from '../../../default/components/form/Form'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Input from '../../../default/components/formElements/input/Input'
import EmailInput from '../../../default/components/formElements/emailInput/EmailInput'
import PhoneInput from '../../../default/components/formElements/phoneInput/PhoneInput'
import AddressInput from '../../../default/components/formElements/addressInput/AddressInput'
import Button from '../../../default/components/button/Button'
import Table from '../../../default/components/table/Table'
import Checkbox from '../../../default/components/formElements/checkbox/Checkbox'
import Label from '../../../default/components/label/Label'
import Controls from '../../../default/components/controls/Controls'

import { BiUserPlus } from 'react-icons/bi'
import { FiCheckCircle } from 'react-icons/fi'

import { menuitems } from '../../../custom/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'
import { createStyle } from '../../../default/utils/createStyle'
import { containsNumber } from '../../../default/utils/containsNumber'
import { notificationManager } from '../../../default/utils/notifications'

import styles from './Users.module.css'

export default function Users(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, hasRole, saveUserData, getUsers, postUser, delUser } = useContext(UserContext)
    const { getAvailableRoles } = useContext(RolesContext)

    const notifications = notificationManager()

    const [data, setData] = useState([])
    const [viewMode, setViewMode] = useState('view users')
    const [selectedUser, setSelectedUser] = useState()

    const columns = [
        {
            Header: applyTranslation('USERNAME'),
            accessor: 'username',
        },
        {
            Header: applyTranslation('EMAIL'),
            accessor: data => data.email,
        },
        ...getAvailableRoles().map(name => {
            return {
                Header: name,
                accessor: data => {
                    return data.roles.includes(name) && <FiCheckCircle />
                }
            }
        })
    ]

    useEffect(() => {

        fetchUsers()

    }, [])

    async function fetchUsers(){

        const response = await getUsers()

        setData(response.data)

    }

    function openEditUser(data){

        setSelectedUser(data)
        setViewMode('edit user')

    }

    function openCreateUser(){

        setSelectedUser()
        setViewMode('create user')

    }

    async function openViewUsers(){

        await fetchUsers()

        setSelectedUser()
        setViewMode('view users')

    }

    async function deleteUser(){

        await alert(`Are you sure you want to delete user ${selectedUser.username}.`)

        await delUser(selectedUser._id)

        openViewUsers()

    }

    async function updateUser(data){

        const {
            username,
            email,
            phone,
            address,
            emails,
            phones,
            addresses,
            newPassword,
            repeatPassword,
            currentPassword,
            roles,
        } = data

        const _id = selectedUser._id

        try {

            const result = await saveUserData({
                _id,
                username,
                email,
                phone,
                address,
                emails,
                phones,
                addresses,
                newPassword,
                repeatPassword,
                currentPassword,
                roles
            })

            notifications.create({
                title: 'Success',
                message:`User ${result.data.username} updated`,
                type: 'success'
            })

        } catch (error) {

            notifications.create({
                title: 'Error',
                message:'Could not update user',
                type: 'danger'
            })

        }

        openViewUsers()

    }

    async function createUser(data){

        const {
            username,
            email,
            phone,
            address,
            newPassword,
            repeatPassword,
            currentPassword,
            roles,
        } = data

        try {

            const result = await postUser({
                username,
                email,
                phone,
                address,
                newPassword,
                repeatPassword,
                currentPassword,
                roles
            })

            notifications.create({
                title: 'Success',
                message:`User ${result.data.username} created`,
                type: 'success'
            })

        } catch (error) {

            notifications.create({
                title: 'Error',
                message:'Could not create user',
                type: 'danger'
            })

        }

        openViewUsers()

    }

    return (
        <Layout
            items={menuitems({ userData, hasRole, applyTranslation })}
            title={applyTranslation('USERS')}
            controls={<Controls />}
            >
            <Card customStyles={applyStyles([styles], 'buttonsCard')}>
                    {
                        viewMode === 'view users' && (
                            <Button
                                label={<><BiUserPlus size={24} /> <p>{applyTranslation('CREATE_NEW_USER')}</p></>}
                                onClick={openCreateUser}
                                customStyles={applyStyles([styles], 'controlsSave')}/>
                        )
                    }
                    {
                        viewMode === 'edit user' && (
                            <>
                                <Button
                                    label={applyTranslation('CLOSE')}
                                    onClick={openViewUsers}
                                    customStyles={applyStyles([styles], 'controlsClose')}/>
                                <Button
                                    label={applyTranslation('DELETE_USER')}
                                    onClick={deleteUser}
                                    customStyles={applyStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                    {
                        viewMode === 'create user' && (
                            <Button
                                label={applyTranslation('CLOSE')}
                                onClick={openViewUsers}
                                customStyles={applyStyles([styles], 'controlsClose')}/>
                        )
                    }
            </Card>
            {
                viewMode === 'view users' && (
                    <div
                        className={createStyle([styles], 'tableSmall')}
                        >
                        {
                            data.map(u => {

                                return (
                                    <Card
                                        key={u._id + 'Card'}
                                        title={u.username}
                                        name={'username'}
                                        description={`Roles: ${u.roles.join(', ')}`}
                                        customStyles={applyStyles([styles], 'tableSmallCard')}
                                        onClick={() => openEditUser(u)}
                                        >
                                        <div
                                            className={styles.emailContainer}>
                                            {u.email}
                                        </div>
                                    </Card>
                                )

                            })
                        }
                    </div>
                )
            }
            {
                viewMode === 'view users' && (
                    <Card
                        customStyles={applyStyles([styles], 'tableBig')}>
                        <Table
                            columns={columns}
                            data={data}
                            onRowClick={openEditUser}
                            />
                    </Card>
                )
            }
            {
                viewMode === 'edit user' && (
                    <Card customStyles={applyStyles([styles], 'card1')}>
                        <Form
                            customStyles={applyStyles([styles], 'testform')}
                            defaultValues={selectedUser}
                            onSubmit={updateUser}
                            >
                            <Input
                                label={applyTranslation('USERNAME')}
                                name={'username'}
                                type={'text'}
                                readOnly
                                shouldRegister
                                />
                            <Input
                                label={applyTranslation('EMAIL')}
                                name={'email'}
                                type={'text'}
                                shouldRegister
                                />
                            <Checkbox
                                label={applyTranslation('ROLES')}
                                shouldRegister
                                name={'roles'}
                                options={getAvailableRoles().map(name => {

                                    return {
                                        name:name,
                                        value:name,
                                        checked:selectedUser.roles.includes(name) ? true : false
                                    }

                                })}
                                />
                            <Input
                                label={applyTranslation('NEW_PASSWORD')}
                                name={'newPassword'}
                                type={'password'}
                                passwordToggle
                                shouldRegister
                                />
                            <Input
                                label={applyTranslation('REPEAT_PASSWORD')}
                                name={'repeatPassword'}
                                type={'password'}
                                passwordToggle
                                shouldRegister
                                />
                            <Input
                                label={applyTranslation('YOUR_PASSWORD')}
                                name={'currentPassword'}
                                type={'password'}
                                passwordToggle
                                shouldRegister
                                />
                        </Form>
                    </Card>
                )
            }
            {
                viewMode === 'create user' && (
                    <Card customStyles={applyStyles([styles], 'card1')}>
                        <Form
                            customStyles={applyStyles([styles], 'testform')}
                            onSubmit={createUser}
                            >
                            <Input
                                label={applyTranslation('USERNAME')}
                                name={'username'}
                                type={'text'}
                                shouldRegister
                                />
                            <Input
                                label={applyTranslation('EMAIL')}
                                name={'email'}
                                type={'text'}
                                shouldRegister
                                />
                            <Checkbox
                                label={'Roles'}
                                name={'roles'}
                                shouldRegister
                                />
                            <Input
                                label={applyTranslation('PASSWORD')}
                                name={'newPassword'}
                                type={'password'}
                                passwordToggle
                                shouldRegister
                                />
                            <Input
                                label={applyTranslation('REPEAT_PASSWORD')}
                                name={'repeatPassword'}
                                type={'password'}
                                passwordToggle
                                shouldRegister
                                />
                            <Input
                                label={applyTranslation('YOUR_PASSWORD')}
                                name={'currentPassword'}
                                type={'password'}
                                passwordToggle
                                shouldRegister
                                />
                        </Form>
                    </Card>
                )
            }
        </Layout>
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


// rules={{
//     validate:{
//         passwordsMatch: () => {
//             if(getValues().newPassword === getValues().repeatPassword) return true
//             return 'Passwords don\'t match'
//         }
//     }
// }}

// rules={{
//     validate:{
//         minLength: value => {
//             if(value.length === 0 || value.length > 7) return true
//             return 'New password is too short'
//         },
//         minNumbers: value => {
//             if(value.length === 0 || containsNumber(value)) return true
//             return 'New password must contain at least one number'
//         },
//         passwordsMatch: () => {
//             if(getValues().newPassword === getValues().repeatPassword) return true
//             return 'Passwords don\'t match'
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


// rules={{
//     validate:{
//         credentialsChanged: value => {
//             if(
//                 value.length > 0
//                 || (
//                     getValues().email === userData.email
//                     && getValues().newPassword.length === 0
//                 )
//             ) return true
//             return 'Please provide your password'
//         }
//     }
// }}
