import ContestGame from "@/app/ui/contestGame/ContestGame";
import styles from "./page.module.css"

export default function ContestPage(){
    return (
        <main className={styles.contestPage}>
            <h1>Welcome to the Canadian Dairy House Photobooth!</h1>
            <ContestGame/>
        </main>
    )
}