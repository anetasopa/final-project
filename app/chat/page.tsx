import Image from 'next/image';
import React from 'react';
import styles from './page.module.scss';

export default function Chat() {
  return (
    <main className={styles.profileContainer}>
      <div className={styles.list}>List</div>
      <div className={styles.chat}>Chat</div>
    </main>
  );
}
