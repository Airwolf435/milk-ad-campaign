import { privacyPolicy } from "@/app/lib/privacyPolicy";
import TextSect from "@/app/ui/textSect/TextSect";
import styles from "./page.module.css";
import { inter } from "@/app/lib/fonts";

export default function LegalPage(){
    return (
        <main className={`${styles.legalMain} ${inter.className}`}>
            <header className={styles.leagalHeader}>
                <h1>
                    Privacy Policy
                </h1>
                <p>
                    Navigating Ownership, Data, Age Restrictions, Winning Chances, and Communication Preferences on Our Platform
                </p>
            </header>
            {privacyPolicy.map((policy, index)=><TextSect key={index} heading={policy.heading} body={policy.body} className={styles.legalSect} />)}
        </main>
    )
}