import { useContext, useState, useEffect } from 'react'

import { UserContext } from '../../contexts/UserContext'

import Button from '../button/Button'

import { createStyle } from '../../utils/createStyle'

import styles from './ImageUploader.module.css'

export default function ImageUploader(attributes){

    const {
        customStyles,
        currentPicture,
        placeholder,
        label
    } = attributes

    const {
        userData,
        saveUserData,
        uploadProfilePicture
    } = useContext(UserContext)

    const [selectedPicture, setSelectedPicture] = useState(null)

    function onFileChange(event){

        const file = event.target.files[0]

        if(file) setSelectedPicture(file)

    }

    async function uploadFile(event){

        event.preventDefault()

        uploadProfilePicture(selectedPicture)

    }

    useEffect(() => {

        if(currentPicture){

            setSelectedPicture()

        }

    }, [currentPicture])

    return (
        <div className={createStyle([styles, customStyles], 'container')}>
            <form method="post" onSubmit={event => uploadFile(event)} encType="multipart/form-data">
                {
                    selectedPicture && (
                        <label
                            htmlFor="image-upload">
                            <img
                                src={URL.createObjectURL(selectedPicture)}
                                contenttype={'image/*'}
                                className={createStyle([styles, customStyles], 'selectedPicture')}
                                />
                        </label>
                    )
                }
                {
                    !selectedPicture && currentPicture && (
                        <label
                            className={createStyle([styles, customStyles], 'pictureBackground')}
                            htmlFor="image-upload">
                            <img
                                src={currentPicture}
                                contenttype={'image/*'}
                                className={createStyle([styles, customStyles], 'selectedPicture')}
                                />
                        </label>
                    )
                }
                {
                    !selectedPicture && !currentPicture && placeholder && (
                        <label
                            className={createStyle([styles, customStyles], 'pictureBackground')}
                            htmlFor="image-upload">
                            <div className={createStyle([styles, customStyles], 'selectedPicture')}>
                                {placeholder}
                            </div>
                        </label>
                    )
                }
                <input
                    id={'image-upload'}
                    type={'file'}
                    accept={'image/*'}
                    className={createStyle([styles, customStyles], 'selector')}
                    onChange={event => onFileChange(event)}/>
                {
                    selectedPicture && (
                        <>
                            <p>
                                {selectedPicture?.name}
                            </p>

                            <Button
                                label={label}
                                />
                        </>
                    )
                }
            </form>
        </div>
    )

}
