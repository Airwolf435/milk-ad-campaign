import Link from "next/link";
import styles from "./footer.module.css";
import { inter } from "@/app/lib/fonts";

export default function Footer(){
    return <footer className={`${styles.footer} ${inter.className}`}>
        <section className={styles.projectCredits}>
            <ul>
                <li>
                    <p>
                        <a href="akshatsanan.com" target="_blank" rel="noreferrer nofollow noopener">
                            Project Lead and Writer - Akshat Sanan
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://www.johnkeenan.ca" target="_blank" rel="noreferrer nofollow noopener">
                            Developer - John Keenan
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://portfolio.jpostolan.com/" target="_blank" rel="noreferrer nofollow noopener">
                            Artist / Designer - Julian Postolan
                        </a>
                    </p>
                </li>
            </ul>
        </section>
        <section className={styles.companyDetailsSect}>
            <div className={styles.companyInfo}>
                <p>555-999-MILK</p>
                <p>Milkcontent@milk.com</p>
                <Link href="/legal">Legal</Link>
            </div>
            <img className={styles.logo} src="./assets/imgs/logo-white.svg" alt="" aria-hidden={true}/>
        </section>
        <section className={styles.socialsCR}>
            <div>
                <Link href="./">
                    <img
                        src="./assets/imgs/facebook-icon.svg"
                        alt="Facebook Social Link Icon"
                        title="Facebook Social Link Icon"
                        width="50"
                        height="50"
                    />
                </Link>

                <Link href="./">
                    <img
                        src="./assets/imgs/snapchat-icon.svg"
                        alt="Snapchat Social Link icon"
                        title="Snapchat Social Link icon"
                        width="50"
                        height="50"
                    />
                </Link>
                
                <Link href="./">
                    <img
                        src="./assets/imgs/instagram-icon.svg"
                        alt="Instagram Social Link Icon"
                        title="Instagram Social Link Icon"
                        width="50"
                        height="50"
                    />
                </Link>
                <Link href="./">
                    <img
                        src="./assets/imgs/twitter-icon.svg"
                        alt="Twitter Social Link Icon"
                        title="Twitter Social Link Icon"
                        width="50"
                        height="50"
                    />
                </Link>
            </div>
            <p>Copyright &copy; {new Date().getFullYear()}</p>
        </section>
    </footer>
}