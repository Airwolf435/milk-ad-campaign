import { nunito } from "@/app/lib/fonts"
import styles from "@/app/ui/header/header.module.css"
import { MainNav } from "../mainNav/MainNav"

export default function Header({children, className}){
    return <header className={`${nunito.className} ${styles.header} ${className}`}>
        <MainNav/>
        {children}
    </header>
}