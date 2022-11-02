import Button from '../../button/Button'

import { applyStyles } from '../../../utils/applyStyles'

import styles from './FormControls.module.css'

export default function formControls(attributes){

    const {
        submitLabel = 'Submit',
        resetLabel = 'Reset',
        handleReset,
        customStyles
    } = attributes

    return (
        <div
            className={styles.container}
            >
            <Button
                label={submitLabel}
                type={'submit'}
                customStyles={applyStyles([styles, customStyles], 'submitBtn')}
                />
            {
                handleReset && (
                    <Button
                        label={resetLabel}
                        onClick={handleReset}
                        customStyles={applyStyles([styles, customStyles], 'resetBtn')}
                        />
                )
            }
        </div>
    )

}
