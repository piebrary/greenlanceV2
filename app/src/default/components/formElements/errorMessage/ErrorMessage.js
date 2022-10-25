import { createStyle } from '../../../utils/createStyle'

import styles from './ErrorMessage.module.css'

export default function ErrorMessage(attributes){

    const {
        errors,
        customStyles,
        validateAs
    } = attributes

    return (
        <>
            {
                errors.types
                && Object.entries(errors.types).map(
                    errorObject => {

                        if(typeof errorObject[1] === 'string'){

                            return (
                                <span className={createStyle([styles, customStyles], 'errorMessage')} key={errorObject[0]}>
                                    {errorObject[1]}
                                </span>
                            )

                        }

                        if(Array.isArray(errorObject[1])){

                            return errorObject[1].map((errorValue, i) => {

                                return (
                                    <span className={createStyle([styles, customStyles], 'errorMessage')} key={errorValue}>
                                        {errorValue}
                                    </span>
                                )

                            })
                        }
                    }
                )
            }
        </>
    )

}
