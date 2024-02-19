import styles from "./textSect.module.css"

export default function TextSect({heading, body, className}){
    return <section className={`${className} ${styles.textSect}`}>
        <h2 className={styles.highlightedText}>{heading}</h2>
        <p>
            {body}
        </p>
    </section>
}