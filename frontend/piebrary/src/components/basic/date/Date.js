import styles from './Date.module.css'

export default function Date({ type, label, onChange }){

    return (
        <button
            className={styles.button}
            onClick={event => onChange(event)}>
            {label}
        </button>
    )

}
