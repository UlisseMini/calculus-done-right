import type { ReactElement } from "react";
import Head from "next/head";
import config from "../lib/config";
import styles from "./Layout.module.css";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactElement[] }) {
  return (
    <>
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
