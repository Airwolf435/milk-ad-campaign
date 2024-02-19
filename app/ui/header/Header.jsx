import { nunito } from "@/app/lib/fonts"
import styles from "./header.module.css"
import { MainNav } from "../mainNav/MainNav"

export default function Header(){
    return <header className={`${nunito.className} ${styles.header}`}>
        <MainNav/>
    </header>
}