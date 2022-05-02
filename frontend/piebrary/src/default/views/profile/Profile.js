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

import { BsPersonCircle } from 'react-icons/bs'

import { menuitems } from '../../assets/js/menu/items'

import { filterStyles } from '../../utils/filterStyles'

import styles from './Profile.module.css'

export default function Profile(){

    const { translate } = useContext(LanguageContext)
    const { isAdmin, userData, saveUserData, getProfilePicture } = useContext(UserContext)

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const [profilePicture, setProfilePicture] = useState()

    const onSubmit = data => saveUserData(data)
    const onReset = event => { event.preventDefault(); reset(); }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ isAdmin, translate })}
            title={translate('PROFILE')}>
            <Card
                customStyles={filterStyles([styles], 'card1')}>
                <Grid customStyles={filterStyles([styles], 'grid')}>
                    <div className={styles.profilePictureContainer}>
                        <div className={styles.categoryLabel}>
                            {translate('PICTURE')}
                        </div>
                        <ImageUploader
                            currentPicture={userData.profilePicture ? '/public/images/profile/' + userData.profilePicture : undefined}
                            defaultPicture={<BsPersonCircle size={'100%'} />}
                            label={translate('UPLOAD')}/>
                    </div>
                    <div className={styles.formContainer}>
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            customStyles={filterStyles([styles], 'testform')}>
                            <div className={styles.categoryLabel}>
                                {translate('PERSONAL_DATA')}
                            </div>
                            <Input
                                label={translate('USERNAME')}
                                name={'username'}
                                type={'text'}
                                defaultValue={userData.username}
                                customStyles={filterStyles([styles], 'inputField')}
                                readOnly={true}
                                />
                            <Input
                                label={translate('FIRSTNAME')}
                                name={'firstName'}
                                type={'text'}
                                defaultValue={userData.firstName}
                                customStyles={filterStyles([styles], 'inputField')}
                                />
                            <Input
                                label={translate('LASTNAME')}
                                name={'lastName'}
                                type={'text'}
                                defaultValue={userData.lastName}
                                register={register}
                                errors={errors}
                                customStyles={filterStyles([styles], 'inputField')}
                                />
                            <ButtonGroup>
                                <Button
                                    label={translate('SAVE')}
                                    onClick={() => handleSubmit(onSubmit)}
                                    />
                                <Button
                                    customStyles={filterStyles([styles], 'reset')}
                                    label={translate('RESET')}
                                    onClick={onReset}
                                    />
                            </ButtonGroup>
                        </Form>
                    </div>
                </Grid>
            </Card>
        </Layout>
    )
}
