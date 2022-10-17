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
import Controls from '../../../default/components/controls/Controls'

import { BsPersonCircle } from 'react-icons/bs'

import { menuitems } from '../../../default/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Profile.module.css'

export default function Profile(){

    const { applyTranslation } = useContext(LanguageContext)
    const { userData, isAdmin, saveUserData, getProfilePicture } = useContext(UserContext)

    const onSubmit = data => saveUserData(data)

    const defaultValues = {
        username:userData.username,
        'name.first':userData.name.first,
        'name.last':userData.name.last,
    }


    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('PROFILE')}
            controls={<Controls />}
            >
            <Card
                customStyles={applyStyles([styles], 'card1')}>
                <Grid customStyles={applyStyles([styles], 'grid')}>
                    <div className={styles.profilePictureContainer}>
                        <ImageUploader
                            currentPicture={userData.profilePicture ? '/public/images/profile/' + userData.profilePicture : undefined}
                            defaultPicture={<BsPersonCircle size={'100%'} />}
                            label={applyTranslation('UPLOAD')}/>
                    </div>
                    <div className={styles.formContainer}>
                        <Form
                            onSubmit={onSubmit}
                            customStyles={applyStyles([styles], 'testform')}
                            defaultValues={defaultValues}
                            >
                            <div className={styles.categoryLabel}>
                                {applyTranslation('PERSONAL_DATA')}
                            </div>
                            <Input
                                label={applyTranslation('USERNAME')}
                                name={'username'}
                                type={'text'}
                                customStyles={applyStyles([styles], 'inputField')}
                                shouldRegister
                                readOnly
                                />
                            <Input
                                label={applyTranslation('FIRSTNAME')}
                                name={'name.first'}
                                type={'text'}
                                customStyles={applyStyles([styles], 'inputField')}
                                shouldRegister
                                />
                            <Input
                                label={applyTranslation('LASTNAME')}
                                name={'name.last'}
                                type={'text'}
                                defaultValue={userData.name.last}
                                shouldRegister
                                customStyles={applyStyles([styles], 'inputField')}
                                />
                        </Form>
                    </div>
                </Grid>
            </Card>
        </Layout>
    )
}
