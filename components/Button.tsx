import type { ReactElement } from "react";
import styles from "./Button.module.css";

// NOTE: Was having an issue with disabled
export default function Button({ children, disabled, ...rest }: any) {
  return (
    <button className={styles.button} {...rest} disabled={disabled}>
      {children}
    </button>
  );
}
