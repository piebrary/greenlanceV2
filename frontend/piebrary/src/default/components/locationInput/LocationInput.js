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
                            key={f.key}
                            label={f.name}
                            name={name ? name + '.' + f.key : f.key}
                            defaultValue={defaultValue && defaultValue[f.key]}
                            readOnly={readOnly}
                            register={register}
                            errors={errors}
                            />
                    )
                })
            }
        </>
    )

}
