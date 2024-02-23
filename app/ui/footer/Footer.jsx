import Link from "next/link";
import styles from "./footer.module.css";
import { inter } from "@/app/lib/fonts";

export default function Footer(){
    return <footer className={`${styles.footer} ${inter.className}`}>
        <section>
            <div className={styles.companyInfo}>
                <p>555-999-MILK</p>
                <p>Milkcontent@milk.com</p>
                <Link href="/legal">Legal</Link>
            </div>
            <img className={styles.logo} src="./assets/imgs/logo-white.svg" alt="" aria-hidden={true}/>
        </section>
        <section>
            <div className="">
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