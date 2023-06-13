import Image from 'next/image';
// eslint-disable-next-line no-restricted-syntax
// 'use client';
import React from 'react';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main>
      <section className={styles.heroContainer}>
        <Image
          className={styles.image}
          src="./images/chat.svg"
          alt="chat image"
          width={800}
          height={500}
        />
        <div className={styles.heroContainerText}>
          <h1 className={styles.heroH1}>
            Connecting You with Your Perfect Match!
          </h1>
          <p className={styles.heroPar}>
            Unleash the power of shared interests and let your true self shine.
          </p>
          <button className={styles.heroButton}>Get started</button>
        </div>
      </section>
    </main>
  );
}
