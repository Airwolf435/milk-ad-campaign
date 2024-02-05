import Image from "next/image";
import styles from "./page.module.css";
import InputForm from "./ui/inputForm/InputForm";

export default function Home() {
  return (
    <main className={styles.main}>
      <sect id="">
        <h1></h1>
      </sect>
      <aside>
        <InputForm />
      </aside>
    </main>
  );
}
