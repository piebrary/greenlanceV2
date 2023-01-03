import { useContext, useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Form from '../../../default/components/form/Form'
import Layout from '../../../default/components/layouts/basic/Layout'
import Card from '../../../default/components/card/Card'
import Grid from '../../../default/components/grid/Grid'
import Input from '../../../default/components/formElements/input/Input'
import Button from '../../../default/components/button/Button'
import ImageUploader from '../../../default/components/imageUploader/ImageUploader'
import Table from '../../../default/components/table/Table'
import Select from '../../../default/components/formElements/select/Select'
import Checkbox from '../../../default/components/formElements/checkbox/Checkbox'
import Controls from '../../../default/components/controls/Controls'

import { BsPersonCircle } from 'react-icons/bs'
import { BsCheck } from 'react-icons/bs'
import { BiUserPlus } from 'react-icons/bi'

import Menu from '../../../default/components/menu/Menu'

import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'

import styles from './Documentation.module.css'

export default function Documentation(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, hasRole } = useContext(UserContext)

    createTranslation('DocumentationView.INTRO', {
        en:`A comprehensive documentation is included. This documentation is updated regularly when an update is available through PieBrary updates. It provides developers working with PieBrary the necessary handles to develop a solid product fast and easy with the lowest change of bugs.`,
        nl:'Een uitgebreide documentatie is inbegrepen. Deze documentatie wordt regelmatig geupdate wanneer door middel van PieBrary updates. Het document bbiedt ontwikkelaars die werken met PieBrary de noodzakelijke handvatten om een degelijk product snel en gemakkelijk te kunnen bouwen, waarbij het risico op bugs zo laag mogelijk wordt gehouden.'
    })

    return (
        <Layout
            items={Menu()}
            title={applyTranslation('DOCUMENTATION')}
            controls={<Controls />}
            >
            <Card>
                {applyTranslation('DocumentationView.INTRO')}
            </Card>
        </Layout>
    )
}
