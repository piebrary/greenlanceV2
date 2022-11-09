import React, { useState } from 'react'

import Button from '../../../default/components/button/Button'
import Card from '../../../default/components/card/Card'
import Form from '../../../default/components/form/Form'

import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './DynamicForm.module.css'

export default function DynamicForm(attributes){

    const {
        children,
        onCreate,
        onUpdate,
        onDelete,
        defaultValues,
        validationSchema,
    } = attributes

    const [mode, setMode] = useState('view')

    function onSubmit(data){

        if(mode === 'create') onCreate(data)
        if(mode === 'update') onUpdate(data)

    }

    return (
        <>
            <Card>
                {
                    mode === 'view' && (
                        <>
                            <Button
                                customStyles={applyStyles([styles], 'cancelShiftButton')}
                                label={'Edit'}
                                onClick={event => {
                                    setMode('update')
                                }}
                                />
                            <Button
                                customStyles={applyStyles([styles], 'cancelShiftButton')}
                                label={'Close'}
                                onClick={event => {
                                    setMode('inactive')
                                }}
                                />
                        </>
                    )
                }
                {
                    mode === 'update' && (
                        <>
                            <Button
                                customStyles={applyStyles([styles], 'cancelShiftButton')}
                                label={'Delete'}
                                onClick={event => {
                                    onDelete()
                                    setMode('update')
                                }}
                                />
                            <Button
                                customStyles={applyStyles([styles], 'cancelShiftButton')}
                                label={'Cancel'}
                                onClick={event => {
                                    setMode('view')
                                }}
                                />
                        </>
                    )
                }
                {
                    mode === 'create' && (
                        <Button
                            customStyles={applyStyles([styles], 'cancelShiftButton')}
                            label={'Cancel'}
                            onClick={event => {
                                setMode('inactive')
                            }}
                            />
                    )
                }
            </Card>
            <Card
                title={mode}
                >
                <Form
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                    validationSchema={validationSchema}
                    >
                    {
                        children.map((child, i) => {

                            return React.cloneElement(
                                child,
                                {
                                    readOnly:mode === 'update' ? false : true
                                }
                            )

                        })
                    }
                </Form>
            </Card>
        </>
    )

}
