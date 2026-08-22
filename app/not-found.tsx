import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page} id="top" aria-labelledby="not-found-title">
      <div className={styles.axis} aria-hidden="true" />
      <div className={styles.header}>
        <span>EMIR / INDEX</span>
        <span>404 / SIGNAL LOST</span>
      </div>
      <div className={styles.content}>
        <p className={styles.eyebrow}>THE REQUESTED STATE IS NOT AVAILABLE</p>
        <h1 id="not-found-title">404 / SIGNAL LOST</h1>
        <Link className={styles.back} href="/">
          BACK TO INDEX <span aria-hidden="true">↑</span>
        </Link>
      </div>
      <div className={styles.footer}>
        <span>EMİR ŞEREN</span>
        <span>ISTANBUL</span>
      </div>
    </main>
  );
}
