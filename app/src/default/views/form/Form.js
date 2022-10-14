import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import { LanguageContext } from '../../../default/contexts/LanguageContext'
import { UserContext } from '../../../default/contexts/UserContext'

import Grid from '../../../default/components/grid/Grid'
import Button from '../../../default/components/button/Button'
import Layout from '../../../default/components/layouts/basic/Layout.js'
import Card from '../../../default/components/card/Card.js'
import Input from '../../../default/components/formElements/input/Input.js'
import MultipleInput from '../../../default/components/formElements/multipleInput/MultipleInput.js'
import Form from '../../../default/components/form2/Form'
import ButtonGroup from '../../../default/components/buttonGroup/ButtonGroup'
import Checkbox from '../../../default/components/formElements/checkbox/Checkbox'
import Select from '../../../default/components/formElements/select/Select'
import Radio from '../../../default/components/formElements/radio/Radio'
import Textarea from '../../../default/components/formElements/textarea/Textarea'
import Datalist from '../../../default/components/formElements/datalist/Datalist'
import Controls from '../../../default/components/controls/Controls'

import { menuitems } from '../../../default/assets/js/menu/items'

import { applyStyles } from '../../../default/utils/applyStyles'
import { containsNumber } from '../../../default/utils/containsNumber'

import styles from './Form.module.css'

export default function FormView(){

    const { applyTranslation, createTranslation } = useContext(LanguageContext)
    const { userData, isAdmin, settings } = useContext(UserContext)

    const onSubmit = data => console.log(data)
    const onReset = () => { console.log('reset')}

    const defaultValues = {
        singleInput1:'singleInput1',
        multiInputTest:[
            {
                input1:'input1',
                input2:'input2',
                textarea:'textarea text1',
            },
            {
                input1:'input1',
                input2:'input2',
                textarea:'textarea text2',
            }
        ]
    }

    return (
        <Layout
            className={styles.container}
            items={menuitems({ userData, isAdmin, applyTranslation })}
            title={applyTranslation('FORM')}
            controls={<Controls />}
            >
            <Card>
                {applyTranslation('FormView.introMessage')}
            </Card>
            <Card>
                <Form
                    onSubmit={onSubmit}
                    defaultValues={defaultValues}
                    >
                    <Input
                        name={'singleInput1'}
                        type={'text'}
                        required={true}
                        />
                    <MultipleInput
                        name={'multiInputTest'}
                        >
                        <Input
                            name={'input1'}
                            type={'text'}
                            />
                        <Input
                            name={'input2'}
                            type={'text'}
                            required={true}
                            />
                        <Textarea
                            name={'textarea'}
                            />
                    </MultipleInput>
                </Form>
            </Card>
        </Layout>
    )
}
