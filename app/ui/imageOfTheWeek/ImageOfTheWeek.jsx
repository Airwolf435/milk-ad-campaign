import Link from "next/link";
import styles from "./imageOfTheWeek.module.css";
import { inter } from "@/app/lib/fonts";

export default function ImageOfTheWeek({className}){
    return(
        <article className={`${styles.imageOfTheWeek} ${inter.className} ${className}`}>
            <section className={styles.text}>
                <h2 className={`${styles.highlightText} ${styles.header}`}>Image of the week!</h2>
                <p>
                Check out the latest winning image below, capturing the essence of joy and vitality with Canadian dairy products. Ready to see your photo in the spotlight next week? Enter our Milk Advertising Photobooth Contest now!
                </p>
                <Link href="/signup" className={styles.contestLink}>Enter Contest!</Link>
            </section>
            <img src="./assets/imgs/imageOfTheWeek.png" alt="Latest contest winner image" title="Latest contest winner image" width="543" height="543"/>
        </article>
    )
}