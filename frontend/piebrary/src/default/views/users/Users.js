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

    const { getTranslation } = useContext(LanguageContext)
    const { isAdmin, userData, saveUserData, getProfilePicture, getUsers, postUser, delUser } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()

    const [data, setData] = useState([])
    const [viewMode, setViewMode] = useState('view users')
    const [selectedUser, setSelectedUser] = useState()

    const columns = [
        {
            Header: getTranslation('USERNAME'),
            accessor: 'username',
        },
        {
            Header: getTranslation('EMAIL'),
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

        })

        if(roles.length === 0){

            roles.push('user')

        }

        const result = await saveUserData({
            _id,
            username,
            email,
            newPassword,
            repeatPassword,
            currentPassword,
            roles
        })

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

        })

        if(roles.length === 0){

            roles.push('user')

        }

        const result = await postUser({
            username,
            email,
            newPassword,
            repeatPassword,
            currentPassword,
            roles
        })

        openViewUsers()

    }

    function onReset(event){

        if(event) event.preventDefault()

        reset()
    }

    return (
        <Layout
            items={menuitems({ isAdmin, getTranslation })}
            title={getTranslation('USERS')}>
            <Card customStyles={filterStyles([styles], 'buttonsCard')}>
                <ButtonGroup>
                    {
                        viewMode === 'edit user' && (
                            <>
                                <Button
                                    label={getTranslation('SAVE')}
                                    customStyles={filterStyles([styles], 'controlsSave')}
                                    onClick={handleSubmit(updateUser)}/>
                                <Button
                                    label={getTranslation('RESET')}
                                    onClick={onReset}
                                    customStyles={filterStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                    {
                        viewMode === 'create user' && (
                            <>
                                <Button
                                    label={getTranslation('SAVE')}
                                    customStyles={filterStyles([styles], 'controlsSave')}
                                    onClick={handleSubmit(createUser)}/>
                                <Button
                                    label={getTranslation('RESET')}
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
                                label={<><BiUserPlus size={24} /> <p>{getTranslation('CREATE_NEW_USER')}</p></>}
                                onClick={openCreateUser}
                                customStyles={filterStyles([styles], 'controlsSave')}/>
                        )
                    }
                    {
                        viewMode === 'edit user' && (
                            <>
                                <Button
                                    label={getTranslation('DELETE_USER')}
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
                                    label={getTranslation('CLOSE')}
                                    onClick={openViewUsers}
                                    customStyles={filterStyles([styles], 'controlsClose')}/>
                            </>
                        )
                    }
                    {
                        viewMode === 'create user' && (
                            <>
                                <Button
                                    label={getTranslation('CLOSE')}
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
                                label={getTranslation('USERNAME')}
                                name={'username'}
                                type={'text'}
                                defaultValue={selectedUser?.username}
                                readOnly={true}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={getTranslation('EMAIL')}
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
                                label={getTranslation('NEW_PASSWORD')}
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
                                label={getTranslation('REPEAT_PASSWORD')}
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
                                label={getTranslation('YOUR_PASSWORD')}
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
                                label={getTranslation('USERNAME')}
                                name={'username'}
                                type={'text'}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={getTranslation('EMAIL')}
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
                                label={getTranslation('PASSWORD')}
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
                                label={getTranslation('REPEAT_PASSWORD')}
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
                                label={getTranslation('YOUR_PASSWORD')}
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
