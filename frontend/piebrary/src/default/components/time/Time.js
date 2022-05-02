import styles from './Time.module.css'

export default function Time({ type, label, onChange }){

    return (
        <button
            className={styles.button}
            onClick={event => onChange(event)}>
            {label}
        </button>
    )

}
