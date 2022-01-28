import type { ReactElement } from "react";
import styles from "./Button.module.css";

export default function Button({ children, ...rest }: any) {
  return (
    <button className={styles.button} {...rest}>
      {children}
    </button>
  );
}
