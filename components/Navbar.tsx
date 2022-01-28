import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        {/* <Link href="/review"><a>Review</a></Link> */}
      </div>
    </nav>
  );
}
