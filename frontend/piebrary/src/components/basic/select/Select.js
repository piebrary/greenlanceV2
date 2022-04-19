import styles from './Select.module.css'

export default function Select({ type, label, onChange }){

    return (
        <button
            className={styles.button}
            onClick={event => onChange && onChange(event)}>
            {label}
        </button>
    )

}
