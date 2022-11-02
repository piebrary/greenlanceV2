import Button from '../button/Button'
import Card from '../card/Card'

import { createStyle } from '../../utils/createStyle'
import { applyStyles } from '../../utils/applyStyles'

import styles from './Confirm.module.css'

export default function Confirm({ customStyles, question, onAgree, onDisagree }){

    return (
        <div
            className={createStyle([styles, customStyles], 'container')}
            >
            <div
                className={createStyle([styles, customStyles], 'cardContainer')}
                >
                <Card
                    title={'Confirm dialog'}
                    customStyles={applyStyles([styles, customStyles], 'card')}
                    >
                    {question}
                    <div
                        className={createStyle([styles, customStyles], 'buttons')}
                        >
                        <Button
                            customStyles={applyStyles([styles, customStyles], 'okBtn')}
                            label={'Ok'}
                            onClick={event => onAgree && onAgree(event)}
                            />
                        <Button
                            customStyles={applyStyles([styles, customStyles], 'cancelBtn')}
                            label={'Cancel'}
                            onClick={event => onDisagree && onDisagree(event)}
                            />
                    </div>
                </Card>
            </div>
        </div>
    )

}
