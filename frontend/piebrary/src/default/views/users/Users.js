import { useContext, useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'

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

import { BsPersonCircle } from 'react-icons/bs'

import { menuitems } from '../../assets/js/menu/items'

import { filterStyles } from '../../utils/filterStyles'
import { containsNumber } from '../../utils/containsNumber'

import styles from './Users.module.css'

import { rolesSelectOptions } from '../../assets/js/user/roles'

export default function Users(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin, userData, saveUserData, getProfilePicture, getUsers } = useContext(UserContext)

    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm()

    const [data, setData] = useState([])
    const [viewMode, setViewMode] = useState('view users')
    const [currentlyViewedUser, setCurrentlyViewedUser] = useState()

    const columns = [
        {
            Header: translate('USERNAME'),
            accessor: 'username',
        },
        {
            Header: translate('EMAIL'),
            accessor: 'email',
        },
        {
            Header: translate('ROLES'),
            accessor: 'roles'
        }
    ]

    useEffect(() => {

        (async () => {

            const response = await getUsers()

            const modifiedData = response.data.map(u => {

                u.roles = u.roles.join(', ')

                return u

            })

            setData(response.data)

        })()

    }, [])

    function onRowClick(data){

        setViewMode('view user')
        setCurrentlyViewedUser(data)

    }

    function closeDetailedViewMode(){

        setViewMode('view users')
        setCurrentlyViewedUser()
        onReset()

    }

    function deleteUser(){

        alert(`Are you sure you want to delete user ${currentlyViewedUser.username}`)

    }

    function saveNewUser(){



    }

    function onSubmit(data){

        saveUserData(data)

    }

    function onReset(event){

        if(event) event.preventDefault()

        reset(currentlyViewedUser)
    }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ isAdmin, translate })}
            title={translate('USERS')}>
            <Card
                customStyles={filterStyles([styles], 'controlsCard')}>
                {
                    viewMode === 'view users' && (
                        <Button
                            label={translate('CREATE_NEW_USER')}
                            onClick={() => setViewMode('create user')}/>
                    )
                }
                {
                    viewMode === 'view user' && (
                        <>
                            <Button
                                label={translate('DELETE_USER')}
                                onClick={deleteUser}
                                customStyles={filterStyles([styles], 'controlsClose')}/>
                            <Button
                                label={translate('CLOSE')}
                                onClick={closeDetailedViewMode}
                                customStyles={filterStyles([styles], 'controlsClose')}/>
                        </>
                    )
                }
                {
                    viewMode === 'create user' && (
                        <>
                            <Button
                                label={translate('CLOSE')}
                                onClick={closeDetailedViewMode}
                                customStyles={filterStyles([styles], 'controlsClose')}/>
                        </>
                    )
                }
            </Card>
            <Card
                customStyles={filterStyles([styles], 'card1')}
                title={(viewMode === 'view user' || viewMode === 'create user') && translate('CREDENTIALS')}>
                {
                    viewMode === 'view users' && (
                        <Table
                            columns={columns}
                            data={data}
                            onRowClick={onRowClick}
                            />
                        )
                }
                {
                    viewMode === 'view user' && (
                        <Form
                            onSubmit={handleSubmit(saveNewUser)}
                            customStyles={filterStyles([styles], 'testform')}>
                            <Input
                                label={translate('USERNAME')}
                                name={'username'}
                                type={'text'}
                                defaultValue={currentlyViewedUser?.username}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={translate('EMAIL')}
                                name={'email'}
                                type={'text'}
                                defaultValue={currentlyViewedUser?.email}
                                register={register}
                                errors={errors}
                                />
                            <Select
                                name={'roles'}
                                label={translate('ROLES')}
                                options={rolesSelectOptions}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={translate('PASSWORD')}
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
                                name={'currentUserPassword'}
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
                                            return 'Current password is required'
                                        }
                                    }
                                }}
                                />
                            <ButtonGroup>
                                <Button
                                    label={translate('SAVE')}
                                    onClick={onSubmit}
                                    />
                                <Button
                                    customStyles={filterStyles([styles], 'controlsClose')}
                                    label={translate('RESET')}
                                    onClick={onReset}
                                    />
                            </ButtonGroup>
                        </Form>
                    )
                }
                {
                    viewMode === 'create user' && (
                        <Form
                            onSubmit={handleSubmit(saveNewUser)}
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
                                options={rolesSelectOptions}
                                register={register}
                                errors={errors}
                                />
                            <Input
                                label={translate('PASSWORD')}
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
                                name={'yourPassword'}
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
                                            return 'Current password is required'
                                        }
                                    }
                                }}
                                />
                            <ButtonGroup>
                                <Button
                                    label={translate('SAVE')}
                                    onClick={() => handleSubmit(saveNewUser)}
                                    />
                                <Button
                                    customStyles={filterStyles([styles], 'controlsClose')}
                                    label={translate('RESET')}
                                    onClick={onReset}
                                    />
                            </ButtonGroup>
                        </Form>
                    )
                }
            </Card>
        </Layout>
    )
}
