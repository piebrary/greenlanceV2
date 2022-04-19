import styles from './Textarea.module.css'

export default function Textarea({ type, label, onChange }){

    return (
        <button
            className={styles.button}
            onClick={event => onChange(event)}>
            {label}
        </button>
    )

}
