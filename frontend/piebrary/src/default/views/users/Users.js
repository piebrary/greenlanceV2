import { useContext, useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

import { putOtherUserData } from '../../services/UserService'

import Form from '../../components/form/Form'
import Layout from '../../components/layouts/simpleMenuLeft/Layout'
import Card from '../../components/card/Card'
import Grid from '../../components/grid/Grid'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'
import ImageUploader from '../../components/imageUploader/ImageUploader'
import Table from '../../components/table/Table'
import Select from '../../components/select/Select'
import Checkbox from '../../components/checkbox/Checkbox'

import { BsPersonCircle } from 'react-icons/bs'
import { BsCheck } from 'react-icons/bs'
import { BiUserPlus } from 'react-icons/bi'

import { menuitems } from '../../assets/js/menu/items'
import { rolesOptions } from '../../assets/js/user/roles'

import { filterStyles } from '../../utils/filterStyles'
import { containsNumber } from '../../utils/containsNumber'

import styles from './Users.module.css'

export default function Users(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin, userData, saveUserData, getProfilePicture, getUsers, postUser } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()

    const [data, setData] = useState([])
    const [viewMode, setViewMode] = useState('view users')
    const [selectedUser, setSelectedUser] = useState()

    const columns = [
        {
            Header: translate('USERNAME'),
            accessor: 'username',
        },
        {
            Header: translate('EMAIL'),
            accessor: 'email',
        },
        ...rolesOptions.map(r => {
            return {
                Header: r.name,
                accessor: data => {
                    return data.roles.includes(r.value) && <BsCheck size={16} />
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

        reset({})
        setViewMode('create user')

    }

    function openViewUsers(){

        setSelectedUser()
        onReset()
        setViewMode('view users')

    }

    function deleteUser(){

        alert(`Are you sure you want to delete user ${selectedUser.username}`)

    }

    async function updateUser(data){

        const {
            username,
            email,
            password,
            currentPassword
        } = data

        const roles = []

        rolesOptions.map(o => {

            if(data['Roles' + o.value] === true){

                roles.push(o.value)

            }

        })

        if(roles.length === 0){

            roles.push('user')

        }

        console.log(data)

        await saveUserData({
            username,
            email,
            password,
            currentPassword,
            roles
        })

        fetchUsers()

    }

    async function createUser(data){

        const {
            username,
            email,
            password,
            repeatPassword,
            currentPassword
        } = data

        const roles = []

        for(let key in rolesOptions){

            if(data[key + 'Checkbox'] === true){

                roles.push(key)

            }

        }

        if(roles.length === 0){

            roles.push('user')

        }

        await postUser({
            username,
            email,
            password,
            repeatPassword,
            currentPassword,
            roles
        })
        fetchUsers()

    }

    function onReset(event){

        if(event) event.preventDefault()

        reset()
    }

    return (
        <Layout
            items={menuitems({ isAdmin, translate })}
            title={translate('USERS')}>
            <Card customStyles={filterStyles([styles], 'buttonsCard')}>
                <ButtonGroup>
                    {
                        viewMode === 'edit user' && (
                            <>
                                <Button
                                    label={translate('SAVE')}
                                    customStyles={filterStyles([styles], 'controlsSave')}
                                    onClick={handleSubmit(updateUser)}/>
                                <Button
                                    label={translate('RESET')}
                                    onClick={onReset}
                                    customStyles={filterStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                    {
                        viewMode === 'create user' && (
                            <>
                                <Button
                                    label={translate('SAVE')}
                                    customStyles={filterStyles([styles], 'controlsSave')}
                                    onClick={handleSubmit(createUser)}/>
                                <Button
                                    label={translate('RESET')}
                                    onClick={onReset}
                                    customStyles={filterStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                </ButtonGroup>
                <ButtonGroup>
                    {
                        viewMode === 'view users' && (
                            <Button
                                label={<><BiUserPlus size={24} /> <p>{translate('CREATE_NEW_USER')}</p></>}
                                onClick={openCreateUser}
                                customStyles={filterStyles([styles], 'controlsSave')}/>
                        )
                    }
                    {
                        viewMode === 'edit user' && (
                            <>
                                <Button
                                    label={translate('DELETE_USER')}
                                    onClick={deleteUser}
                                    customStyles={filterStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                </ButtonGroup>
                <ButtonGroup>
                    {
                        viewMode === 'edit user' && (
                            <>
                                <Button
                                    label={translate('CLOSE')}
                                    onClick={openViewUsers}
                                    customStyles={filterStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                    {
                        viewMode === 'create user' && (
                            <>
                                <Button
                                    label={translate('CLOSE')}
                                    onClick={openViewUsers}
                                    customStyles={filterStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                </ButtonGroup>
            </Card>
            <Card customStyles={filterStyles([styles], 'card1')}>
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
                            customStyles={filterStyles([styles], 'testform')}>
                            <Input
                                label={translate('USERNAME')}
                                name={'username'}
                                type={'text'}
                                defaultValue={selectedUser?.username}
                                readOnly={true}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={translate('EMAIL')}
                                name={'email'}
                                type={'text'}
                                defaultValue={selectedUser?.email}
                                register={register}
                                errors={errors}
                                />
                            <Checkbox
                                label={'Roles'}
                                onClick={console.log}
                                register={register}
                                errors={errors}
                                options={rolesOptions.map(r => {

                                    if(selectedUser.roles.includes(r.value)){

                                        r.checked = true

                                    }

                                    return r

                                })}
                                />
                            <Input
                                label={translate('NEW_PASSWORD')}
                                name={'password'}
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
                                label={translate('REPEAT_PASSWORD')}
                                name={'repeatPassword'}
                                type={'password'}
                                hideToggle={true}
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
                            <Input
                                label={translate('YOUR_PASSWORD')}
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
                            customStyles={filterStyles([styles], 'testform')}>
                            <Input
                                label={translate('USERNAME')}
                                name={'username'}
                                type={'text'}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={translate('EMAIL')}
                                name={'email'}
                                type={'text'}
                                register={register}
                                errors={errors}
                                />
                            <Select
                                name={'roles'}
                                label={translate('ROLES')}
                                options={rolesOptions}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={translate('PASSWORD')}
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
                                label={translate('REPEAT_PASSWORD')}
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
                                label={translate('YOUR_PASSWORD')}
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
