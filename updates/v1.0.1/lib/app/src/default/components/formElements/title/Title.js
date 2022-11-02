import RequiredLabel from'../requiredLabel/RequiredLabel'

import styles from './Title.module.css'

export default function Title(attributes){

    const {
        title,
        required,
        customStyles
    } = attributes

    return (
        <>
            {
                (title !== undefined || required)
                && (
                    <div
                        className={styles.container}
                        >
                        <span
                            className={styles.title}
                            >
                            {title}
                        </span>
                        <span
                            className={styles.required}
                            >
                            {required && <RequiredLabel />}
                        </span>
                    </div>
                )
            }
        </>
    )

}
