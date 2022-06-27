import styles from './LocationInput.module.css'

export default function LocationInput({ fields, defaultValue, register, errors, readOnly, name }){

    let Input

    try { Input = require('../../../custom/components/formElements/input/Input').default } catch { Input = require('../../../default/components/formElements/input/Input').default }

    return (
        <>
            {
                fields.map(f => {

                    return (
                        <Input
                            key={f.name}
                            label={f.label}
                            name={name + '.' + f.name}
                            defaultValue={defaultValue && defaultValue[f.name]}
                            readOnly={f.readOnly}
                            register={register}
                            errors={errors}
                            />
                    )
                })
            }
        </>
    )

}
