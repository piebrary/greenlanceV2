import styles from './Input.module.css'

export default function Input({ label, onChange, hidden, hideToggle, placeholder, requirements }){



    return (
        <input
            className={styles.input}
            id={label}
            type={hidden ? 'password' : 'text'}
            onChange={event => onChange && onChange(event)}/>
    )

}
