import { useContext, useState, useEffect } from 'react'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'
import { VisualsContext } from '../../../default/contexts/VisualsContext'

import Layout from '../../../default/components/layouts/basic/Layout'
import Confirm from '../../../default/components/confirm/Confirm'
import Button from '../../../default/components/button/Button'
import Card from '../../../default/components/card/Card'
import Controls from '../../../default/components/controls/Controls'

import { menuitems } from '../../../default/assets/js/menu/items'
import { applyStyles } from '../../../default/utils/applyStyles'

import styles from './Confirm.module.css'

export default function ConfirmView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)
    const { disableScroll, enableScroll } = useContext(VisualsContext)

    const [showConfirm, setShowConfirm] = useState(false)

    const items = []

    createTranslation('ConfirmView.Description', {
        en:'The confirm dialog component can be used to get a confirmation of a desired action before processing that action.',
        nl:'Het bevestingsvenster kan gebruikt worden om te controleren of een gebruiker een bepaalde (onherstelbare) actie wilde utivoeren.'
    })

    createTranslation('ConfirmView.Show_confirm_title', {
        en:'Confirm dialog',
        nl:'Bevestigingsvenster'
    })

    createTranslation('ConfirmView.Show_confirm_body', {
        en:'Click here to open a new confirmation dialog',
        nl:'Klik hier om een bevestigings venster te openen'
    })

    createTranslation('ConfirmView.Question', {
        en:'This is the confirm question to be accepted or rejected.',
        nl:'Dit is de bevestigingsvraag die geaccepteerd of geweigerd kan worden.'
    })

    createTranslation('ConfirmView.Agreed', {
        en:'You confirmed the question',
        nl:'Je hebt de vraag bevestigd'
    })

    createTranslation('ConfirmView.Disagreed', {
        en:'You disagreed to the question',
        nl:'Je bent het oneens met de vraag'
    })

    return (
        <Layout
            items={menuitems({ userData, hasRole, applyTranslation })}
            title={applyTranslation('CONFIRM_DIALOG')}
            controls={<Controls />}
            >
            <Card>
                {applyTranslation('ConfirmView.Description')}
            </Card>
            <Card
                title={applyTranslation('ConfirmView.Show_confirm_title')}
                onClick={() => {
                    disableScroll()
                    setShowConfirm(true)
                }}
                >
                {applyTranslation('ConfirmView.Show_confirm_body')}
            </Card>
            {
                showConfirm && (
                    <Confirm
                        question={applyTranslation('ConfirmView.Question')}
                        onAgree={event => {
                            alert(applyTranslation('ConfirmView.Agreed'))
                            setShowConfirm(false)
                            enableScroll()
                        }}
                        onDisagree={event => {
                            alert(applyTranslation('ConfirmView.Disagreed'))
                            setShowConfirm(false)
                            enableScroll()
                        }}
                    /   >
                )
            }
        </Layout>
    )
}
