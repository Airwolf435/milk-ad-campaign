import styles from "./page.module.css";
import Header from "./ui/header/Header";
import Link from "next/link";
import ImageOfTheWeek from "./ui/imageOfTheWeek/ImageOfTheWeek";
import { ProductPitch } from "./ui/productPitch/ProductPitch";
export default function Home() {
  return (
    <>
    <Header className={styles.headerOverride}>
      <section className={styles.splashHeader}>
        <h1>
          Welcome to Canadian Dairy House!
        </h1>
        <p>
          Join Canadian Dairy House in celebrating the goodness of Canadian dairy and making your mark in our campaign! Enter our Milk Advertising Photobooth Contest now and let your love for milk shine bright while living life right.
        </p>
        <Link
          href="/signup"
          className={`${styles.headerLink} ${styles.mainContestLink}`}
        >Enter Contest!</Link>
        <Link href="/legal" className={`${styles.headerLink} ${styles.subtleLink}`}>Terms & Conditions</Link>
      </section>
    </Header>
    <main className={styles.main}>
      <ImageOfTheWeek className={`${styles.weekly}`}/>
      <ProductPitch/>
    </main>
    </>
  );
}
