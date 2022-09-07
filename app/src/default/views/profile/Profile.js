import { useContext, useEffect } from 'react'

import { useForm } from "react-hook-form"

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Form from '../../../default/components/form/Form'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Grid from '../../../default/components/grid/Grid'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import ButtonGroup from '../../../default/components/buttonGroup/ButtonGroup'
import ImageUploader from '../../../default/components/imageUploader/ImageUploader'

import { BsPersonCircle } from 'react-icons/bs'

import { menuitems } from '../../../default/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Profile.module.css'

export default function Profile(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, isAdmin, saveUserData, getProfilePicture } = useContext(UserContext)

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = data => saveUserData(data)
    const onReset = event => { event.preventDefault(); reset(); }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, isAdmin, applyTranslation })}
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
                                name={'name.first'}
                                type={'text'}
                                defaultValue={userData.name.first}
                                register={register}
                                errors={errors}
                                customStyles={applyStyles([styles], 'inputField')}
                                />
                            <Input
                                label={applyTranslation('LASTNAME')}
                                name={'name.last'}
                                type={'text'}
                                defaultValue={userData.name.last}
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
