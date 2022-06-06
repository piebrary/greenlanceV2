import { useContext, useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import Form from '../../components/form/Form'
import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'
import Table from '../../components/table/Table'
import Checkbox from '../../components/checkbox/Checkbox'

import { BiUserPlus } from 'react-icons/bi'

import { menuitems } from '../../assets/js/menu/items'
import { rolesOptions } from '../../assets/js/user/roles'

import { applyStyles } from '../../utils/applyStyles'
import { containsNumber } from '../../utils/containsNumber'
import { notificationManager } from '../../utils/notifications'

import styles from './Users.module.css'

export default function Users(){

    const { applyTranslation } = useContext(LanguageContext)
    const { isAdmin, userData, saveUserData, getUsers, postUser, delUser } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()

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
            accessor: 'email',
        },
        ...rolesOptions.map(r => {
            return {
                Header: r.name,
                accessor: data => {
                    return data.roles.includes(r.value) && 'x'
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
        reset(selectedUser)
        setViewMode('edit user')

    }

    function openCreateUser(){

        setSelectedUser()
        reset({})
        setViewMode('create user')

    }

    async function openViewUsers(){

        await fetchUsers()

        setSelectedUser()
        reset({})
        setViewMode('view users')

    }

    async function deleteUser(){

        await alert(`Are you sure you want to delete user ${selectedUser.username}.    REPLACE WITH CONFIRM COMPONENT WHEN BUILD`)

        await delUser(selectedUser._id)

        openViewUsers()

    }

    async function updateUser(data){

        const {
            username,
            email,
            newPassword,
            repeatPassword,
            currentPassword
        } = data

        const _id = selectedUser._id

        const roles = []

        rolesOptions.map(o => {

            if(data['Roles' + o.value] === true){

                roles.push(o.value)

            }

            return o

        })

        if(roles.length === 0){

            roles.push('user')

        }

        try {

            const result = await saveUserData({
                _id,
                username,
                email,
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
            newPassword,
            repeatPassword,
            currentPassword
        } = data

        const roles = []

        rolesOptions.map(o => {

            if(data['Roles' + o.value] === true){

                roles.push(o.value)

            }

            return o

        })

        if(roles.length === 0){

            roles.push('user')

        }

        try {

            const result = await postUser({
                username,
                email,
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

    function onReset(event){

        if(event) event.preventDefault()

        reset()
    }

    return (
        <Layout
            items={menuitems({ isAdmin, applyTranslation })}
            title={applyTranslation('USERS')}>
            <Card customStyles={applyStyles([styles], 'buttonsCard')}>
                <ButtonGroup>
                    {
                        viewMode === 'edit user' && (
                            <>
                                <Button
                                    label={applyTranslation('SAVE')}
                                    customStyles={applyStyles([styles], 'controlsSave')}
                                    onClick={handleSubmit(updateUser)}/>
                                <Button
                                    label={applyTranslation('RESET')}
                                    onClick={onReset}
                                    customStyles={applyStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                    {
                        viewMode === 'create user' && (
                            <>
                                <Button
                                    label={applyTranslation('SAVE')}
                                    customStyles={applyStyles([styles], 'controlsSave')}
                                    onClick={handleSubmit(createUser)}/>
                                <Button
                                    label={applyTranslation('RESET')}
                                    onClick={onReset}
                                    customStyles={applyStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                </ButtonGroup>
                <ButtonGroup>
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
                                    label={applyTranslation('DELETE_USER')}
                                    onClick={deleteUser}
                                    customStyles={applyStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                </ButtonGroup>
                <ButtonGroup>
                    {
                        viewMode === 'edit user' && (
                            <>
                                <Button
                                    label={applyTranslation('CLOSE')}
                                    onClick={openViewUsers}
                                    customStyles={applyStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                    {
                        viewMode === 'create user' && (
                            <>
                                <Button
                                    label={applyTranslation('CLOSE')}
                                    onClick={openViewUsers}
                                    customStyles={applyStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                </ButtonGroup>
            </Card>
            <Card customStyles={applyStyles([styles], 'card1')}>
                {
                    viewMode === 'view users' && (
                        <Table
                            columns={columns}
                            data={data}
                            onRowClick={openEditUser}
                            />
                        )
                }
                {
                    viewMode === 'edit user' && (
                        <Form
                            customStyles={applyStyles([styles], 'testform')}>
                            <Input
                                label={applyTranslation('USERNAME')}
                                name={'username'}
                                type={'text'}
                                defaultValue={selectedUser?.username}
                                readOnly={true}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={applyTranslation('EMAIL')}
                                name={'email'}
                                type={'text'}
                                defaultValue={selectedUser?.email}
                                register={register}
                                errors={errors}
                                />
                            <Checkbox
                                label={'Roles'}
                                register={register}
                                errors={errors}
                                options={rolesOptions.map(r => {

                                    return {
                                        name:r.name,
                                        value:r.value,
                                        checked:selectedUser.roles.includes(r.value) ? true : false
                                    }

                                })}
                                />
                            <Input
                                label={applyTranslation('NEW_PASSWORD')}
                                name={'newPassword'}
                                type={'password'}
                                hideToggle={true}
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
                                label={applyTranslation('REPEAT_PASSWORD')}
                                name={'repeatPassword'}
                                type={'password'}
                                hideToggle={true}
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
                            <Input
                                label={applyTranslation('YOUR_PASSWORD')}
                                name={'currentPassword'}
                                type={'password'}
                                hideToggle={true}
                                register={register}
                                errors={errors}
                                rules={{
                                    validate:{
                                        minLength: value => {
                                            if(value.length > 0) return true
                                            return 'Please provide your password'
                                        },
                                    }
                                }}
                                />
                        </Form>
                    )
                }
                {
                    viewMode === 'create user' && (
                        <Form
                            customStyles={applyStyles([styles], 'testform')}>
                            <Input
                                label={applyTranslation('USERNAME')}
                                name={'username'}
                                type={'text'}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={applyTranslation('EMAIL')}
                                name={'email'}
                                type={'text'}
                                register={register}
                                errors={errors}
                                />
                            <Checkbox
                                label={'Roles'}
                                register={register}
                                errors={errors}
                                options={rolesOptions}
                                />
                            <Input
                                label={applyTranslation('PASSWORD')}
                                name={'newPassword'}
                                type={'password'}
                                hideToggle={true}
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
                                        },
                                        passwordsMatch: () => {
                                            if(getValues().newPassword === getValues().repeatPassword) return true
                                            return 'Passwords don\'t match'
                                        }
                                    }
                                }}
                                />
                            <Input
                                label={applyTranslation('REPEAT_PASSWORD')}
                                name={'repeatPassword'}
                                type={'password'}
                                hideToggle={true}
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
                            <Input
                                label={applyTranslation('YOUR_PASSWORD')}
                                name={'currentPassword'}
                                type={'password'}
                                hideToggle={true}
                                register={register}
                                errors={errors}
                                rules={{
                                    validate:{
                                        credentialsChanged: value => {
                                            if(
                                                value.length > 0
                                                || (
                                                    getValues().email === userData.email
                                                    && getValues().newPassword.length === 0
                                                )
                                            ) return true
                                            return 'Please provide your password'
                                        }
                                    }
                                }}
                                />
                        </Form>
                    )
                }
            </Card>
        </Layout>
    )
}
