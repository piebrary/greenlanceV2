import { useContext, useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../contexts/LanguageContext'
import { UserContext } from '../../contexts/UserContext'
import { VisualsContext } from '../../contexts/VisualsContext'

import Form from '../../components/form/Form'
import Layout from '../../components/layouts/basic/Layout'
import Card from '../../components/card/Card'
import Input from '../../components/formElements/input/Input'
import EmailInput from '../../components/formElements/emailInput/EmailInput'
import PhoneInput from '../../components/formElements/phoneInput/PhoneInput'
import AddressInput from '../../components/formElements/addressInput/AddressInput'
import Button from '../../components/button/Button'
import ButtonGroup from '../../components/buttonGroup/ButtonGroup'
import Table from '../../components/table/Table'
import Checkbox from '../../components/formElements/checkbox/Checkbox'
import Label from '../../components/label/Label'

import { BiUserPlus } from 'react-icons/bi'

import { menuitems } from '../../assets/js/menu/items'
import { rolesOptions } from '../../assets/js/user/roles'

import { applyStyles } from '../../utils/applyStyles'
import { createStyle } from '../../utils/createStyle'
import { containsNumber } from '../../utils/containsNumber'
import { notificationManager } from '../../utils/notifications'

import styles from './Users.module.css'

export default function Users(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, isAdmin, saveUserData, getUsers, postUser, delUser } = useContext(UserContext)

    const { register, unregister, control, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm()

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
            accessor: data => data.email[0].email,
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
            phone,
            address,
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
                phone,
                address,
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

    function onReset(event){

        if(event) event.preventDefault()

        reset(selectedUser)
    }

    return (
        <Layout
            items={menuitems({ userData, isAdmin, applyTranslation })}
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
                                        description={`Roles: ${u.roles.join(', ')}`}
                                        customStyles={applyStyles([styles], 'tableSmallCard')}
                                        onClick={() => openEditUser(u)}
                                        >
                                        {
                                            u.email.map(e => {

                                                return (
                                                    <div
                                                        key={u._id + e.label + 'EmailContainer'}
                                                        className={styles.emailContainer}>
                                                        {e.label} {e.email}
                                                    </div>
                                                )

                                            })
                                        }
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
                            customStyles={applyStyles([styles], 'testform')}>
                            <Input
                                label={<Label customStyles={applyStyles([styles], 'clearLabel')}>{applyTranslation('USERNAME')}</Label>}
                                name={'username'}
                                type={'text'}
                                defaultValue={selectedUser?.username}
                                readOnly={true}
                                register={register}
                                errors={errors}
                                />
                            <EmailInput
                                label={<Label customStyles={applyStyles([styles], 'clearLabel')}>{applyTranslation('EMAIL')}</Label>}
                                name={'email'}
                                type={'text'}
                                defaultValue={selectedUser?.email}
                                setValue={setValue}
                                register={register}
                                unregister={unregister}
                                errors={errors}
                                getValues={getValues}
                                control={control}
                                reset={onReset}
                                />
                            <PhoneInput
                                label={<Label customStyles={applyStyles([styles], 'clearLabel')}>{applyTranslation('PHONE')}</Label>}
                                name={'phone'}
                                type={'text'}
                                defaultValue={selectedUser?.phone}
                                setValue={setValue}
                                register={register}
                                unregister={unregister}
                                errors={errors}
                                getValues={getValues}
                                control={control}
                                reset={onReset}
                                />
                            <AddressInput
                                label={<Label customStyles={applyStyles([styles], 'clearLabel')}>{applyTranslation('ADDRESS')}</Label>}
                                name={'address'}
                                type={'text'}
                                defaultValue={selectedUser?.address}
                                setValue={setValue}
                                register={register}
                                unregister={unregister}
                                errors={errors}
                                getValues={getValues}
                                control={control}
                                reset={onReset}
                                />
                            <Checkbox
                                label={applyTranslation('ROLES')}
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
                                label={<Label customStyles={applyStyles([styles], 'clearLabel')}>{applyTranslation('NEW_PASSWORD')}</Label>}
                                name={'newPassword'}
                                type={'password'}
                                passwordToggle={true}
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
                                label={<Label customStyles={applyStyles([styles], 'clearLabel')}>{applyTranslation('REPEAT_PASSWORD')}</Label>}
                                name={'repeatPassword'}
                                type={'password'}
                                passwordToggle={true}
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
                                label={<Label customStyles={applyStyles([styles], 'clearLabel')}>{applyTranslation('YOUR_PASSWORD')}</Label>}
                                name={'currentPassword'}
                                type={'password'}
                                passwordToggle={true}
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
                    </Card>
                )
            }
            {
                viewMode === 'create user' && (
                    <Card customStyles={applyStyles([styles], 'card1')}>
                        <Form
                            customStyles={applyStyles([styles], 'testform')}>
                            <Input
                                label={<Label>{applyTranslation('USERNAME')}</Label>}
                                name={'username'}
                                type={'text'}
                                register={register}
                                errors={errors}
                                />
                            <EmailInput
                                label={applyTranslation('EMAIL')}
                                name={'email'}
                                type={'text'}
                                defaultValue={selectedUser?.email}
                                setValue={setValue}
                                register={register}
                                unregister={unregister}
                                errors={errors}
                                getValues={getValues}
                                control={control}
                                />
                            <PhoneInput
                                label={applyTranslation('PHONE')}
                                name={'phone'}
                                type={'text'}
                                defaultValue={selectedUser?.phone}
                                setValue={setValue}
                                register={register}
                                unregister={unregister}
                                errors={errors}
                                getValues={getValues}
                                control={control}
                                />
                            <AddressInput
                                label={applyTranslation('ADDRESS')}
                                name={'address'}
                                type={'text'}
                                defaultValue={selectedUser?.address}
                                setValue={setValue}
                                register={register}
                                unregister={unregister}
                                errors={errors}
                                getValues={getValues}
                                control={control}
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
                                passwordToggle={true}
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
                                passwordToggle={true}
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
                                passwordToggle={true}
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
                    </Card>
                )
            }
        </Layout>
    )
}
