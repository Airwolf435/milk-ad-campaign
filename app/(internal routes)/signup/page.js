import Image from "next/image";
import styles from "./page.module.css";
import InputForm from "../../ui/inputForm/InputForm";
import { nunito } from "../../lib/fonts";

export default function SignupPage() {
  return (
    <main className={styles.main}>
      <section className={styles.splashSect}>
        <div>
          <h2 className={nunito.className}>
            Step into the <span className={styles.highlighter}>Spotlight:</span>
            </h2>
          <h3 className={nunito.className}>
            Enter the Milk Advertising <span className={styles.highlighter}>Photobooth Contest!</span>
          </h3>
        </div>
        <p className={`${styles.altText} ${styles.tagline}`}>
          <span className={styles.highlighter}>Enter</span> our Milk Advertising Photobooth contest for a chance to be <span className={styles.highlighter}>featured in our promotions</span>. Don't miss out on this opportunity to showcase your love for milk and dairy products in an active lifestyle.
        </p>
        <p className={styles.altText}>
          Our winners will be selected through a random draw to ensure fairness. However, please note that judges reserve the right to remove entries for any reason, including failure to comply with contest rules or submission of inappropriate content.
        </p>
        <video autoPlay muted loop>
          <source src="/assets/videos/splashVideo.mp4" />
        </video>
      </section>
      <aside>
        <InputForm />
      </aside>
    </main>
  );
}
