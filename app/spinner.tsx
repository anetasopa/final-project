import styles from './spinner.module.scss';
import React from "react";

export default function Spinner() {
  return <div className={styles.spinner}>
    <div className={styles.loader} />
  </div>;
}
