import Image from 'next/image';
import React from 'react';
import styles from './page.module.scss';

export default function Chat() {
  return (
    <main className={styles.profileContainer}>
      <div>List</div>
      <div>Chat</div>
    </main>
  );
}
