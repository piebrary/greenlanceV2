import { useState, useEffect } from 'react'

import { useForm } from "react-hook-form"

import Button from '../button/Button'
import Checkbox from '../checkbox/Checkbox'
import Date from '../date/Date'
import Input from '../input/Input'
import Select from '../select/Select'
import Textarea from '../textarea/Textarea'
import Time from '../time/Time'

import { generateStyles } from '../../../utils/generateStyles'
import { filterStyles } from '../../../utils/filterStyles'

import styles from './Form.module.css'

export default function Form({ customStyles, children, onSubmit }){

    return (
        <form
            onSubmit={onSubmit}
            className={generateStyles([styles, customStyles], 'form')}>
            {children}
        </form>
    )

}
