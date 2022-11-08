import ErrorMessage from'../errorMessage/ErrorMessage'
import Title from'../title/Title'
import Input from'../input/Input'

import { createStyle } from '../../../utils/createStyle'

import styles from './Select.module.css'

export default function Select(attributes){

    const {
        customStyles,
        label,
        name,
        options,
        defaultValue,
        onChange,
        register,
        errors,
        rules,
        multiple,
        size,
        required,
        readOnly
    } = attributes

    const reg = register && register(name)

    return options && (
        <div className={createStyle([styles, customStyles], 'container')}>
            <Title
                title={label}
                required={!readOnly && required}
                />
            {
                !readOnly && (
                    <select
                        id={name}
                        className={createStyle([styles, customStyles], 'select')}
                        multiple={multiple}
                        size={size}
                        {...register(name, rules)}
                        onChange={onChange}>
                        {
                            options.map(o => {

                                return (
                                    <option
                                        value={o.value}
                                        key={o.value}
                                        id={o.name}
                                        >
                                        {o.name}
                                    </option>
                                )

                            })
                        }
                    </select>
                )
            }
            {
                readOnly && (
                    <Input
                        readOnly={true}
                        placeholder={defaultValue}
                        />
                )
            }
            {
                reg
                && errors
                && errors[name]
                && <ErrorMessage
                    errors={errors[name]}
                    />
            }
        </div>
    )

}
