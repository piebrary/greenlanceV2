import styles from './Checkbox.module.css'

export default function Checkbox({ customStyle, type, label, onChange }){

    const classNames = [styles.checkbox, customStyle].join(' ')

    return (
        <input
            type='checkbox'
            className={classNames}
            onClick={event => onChange && onChange(event)}>
            {label}
        </input>
    )

}
