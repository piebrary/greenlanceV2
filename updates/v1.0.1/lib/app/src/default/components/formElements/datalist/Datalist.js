import ErrorMessage from'../errorMessage/ErrorMessage'
import Title from'../title/Title'

import { createStyle } from '../../../utils/createStyle'

import styles from './Datalist.module.css'

export default function Datalist(attributes){

    const {
        customStyles,
        label,
        name,
        options,
        defaultValue,
        onChange,
        register,
        errors,
        rules = {},
        multiple,
        required
    } = attributes

    return options && (
        <div className={createStyle([styles, customStyles], 'container')}>
            <Title
                title={label}
                required={required}
                />
            <input
                type={'text'}
                list={name}
                className={createStyle([styles, customStyles], 'input')}
                {...register(name, rules)}
                onChange={onChange}
                defaultValue={defaultValue}
                />
            <datalist
                id={name}
                className={createStyle([styles, customStyles], 'datalist')}
                >
                {
                    options.map(o => {

                        return (
                            <option
                                value={o.name}
                                key={o.value}>
                            </option>
                        )

                    })
                }
            </datalist>
            {
                register
                && errors
                && errors[name]
                && <ErrorMessage
                    errors={errors[name]}
                    />
            }
        </div>
    )

}
