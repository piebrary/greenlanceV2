import { useContext, useEffect } from 'react'

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

import { applyStyles } from '../../utils/applyStyles'

import styles from './Profile.module.css'

export default function Profile(){

    const { applyTranslation } = useContext(LanguageContext)
    const { isAdmin, userData, saveUserData, getProfilePicture } = useContext(UserContext)

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = data => saveUserData(data)
    const onReset = event => { event.preventDefault(); reset(); }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ isAdmin, applyTranslation })}
            title={applyTranslation('PROFILE')}>
            <Card
                customStyles={applyStyles([styles], 'card1')}>
                <Grid customStyles={applyStyles([styles], 'grid')}>
                    <div className={styles.profilePictureContainer}>
                        <div className={styles.categoryLabel}>
                            {applyTranslation('PICTURE')}
                        </div>
                        <ImageUploader
                            currentPicture={userData.profilePicture ? '/public/images/profile/' + userData.profilePicture : undefined}
                            defaultPicture={<BsPersonCircle size={'100%'} />}
                            label={applyTranslation('UPLOAD')}/>
                    </div>
                    <div className={styles.formContainer}>
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            customStyles={applyStyles([styles], 'testform')}>
                            <div className={styles.categoryLabel}>
                                {applyTranslation('PERSONAL_DATA')}
                            </div>
                            <Input
                                label={applyTranslation('USERNAME')}
                                name={'username'}
                                type={'text'}
                                defaultValue={userData.username}
                                customStyles={applyStyles([styles], 'inputField')}
                                readOnly={true}
                                />
                            <Input
                                label={applyTranslation('FIRSTNAME')}
                                name={'firstName'}
                                type={'text'}
                                defaultValue={userData.firstName}
                                customStyles={applyStyles([styles], 'inputField')}
                                />
                            <Input
                                label={applyTranslation('LASTNAME')}
                                name={'lastName'}
                                type={'text'}
                                defaultValue={userData.lastName}
                                register={register}
                                errors={errors}
                                customStyles={applyStyles([styles], 'inputField')}
                                />
                            <ButtonGroup>
                                <Button
                                    label={applyTranslation('SAVE')}
                                    onClick={() => handleSubmit(onSubmit)}
                                    />
                                <Button
                                    customStyles={applyStyles([styles], 'reset')}
                                    label={applyTranslation('RESET')}
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
