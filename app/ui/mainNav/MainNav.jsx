import Link from "next/link"
import styles from "./mainNav.module.css"
import { nunito } from "@/app/lib/fonts"

export function MainNav(){
    return <nav className={styles.mainNav}>
        <Link href="/" className={`${styles.logoNav} ${styles.navItem}`}>
            <img src="./assets/imgs/logo-cow.svg" alt="" aria-hidden={true}/>
            <p>Milk Photo Booth</p>
        </Link>
        <ul className={`${styles.navList} ${nunito.className}`}>
            <li>
                <Link href="/contest" className={styles.navItem}>Contest</Link>
            </li>
            <li>
                <Link href="/legal" className={styles.navItem}>Legal</Link>
            </li>
        </ul>
    </nav>
}