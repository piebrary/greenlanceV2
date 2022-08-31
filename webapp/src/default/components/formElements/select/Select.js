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
        multiple
    } = attributes

    return options && (
        <div className={createStyle([styles, customStyles], 'container')}>
            {
                label && (
                    <label
                        className={createStyle([styles, customStyles], 'label')}
                        >
                        {label}
                    </label>
                )
            }
            <select
                id={name}
                className={createStyle([styles, customStyles], 'select')}
                defaultValue={defaultValue?.value}
                multiple={multiple}
                {...register(name, rules)}
                onChange={onChange}>
                {
                    options.map(o => {

                        return (
                            <option
                                value={o.value}
                                key={o.value}
                                id={o.name}>
                                {o.name}
                            </option>
                        )

                    })
                }
            </select>
        </div>
    )

}
