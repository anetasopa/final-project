import Image from 'next/image';
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

      <section className={styles.aboutUsContainer}>
        <h3>About Us</h3>
        <p>
          We understand the importance of shared passions and compatible
          personalities. <span>ChatSync</span> is a revolutionary app that
          brings together individuals who share common hobbies, goals, and
          values. Say goodbye to superficial small talk and hello to deep,
          meaningful conversations with like-minded souls.
        </p>
      </section>

      <section className={styles.benefitsContainer}>
        <h3>Benefits</h3>
        <div>
          <div>
            <Image
              className={styles.image}
              src="./images/common2.svg"
              alt="chat image"
              width={800}
              height={500}
            />
            <h5>Common Ground</h5>
            <p>
              It makes easier to build a strong foundation for a relationship.
            </p>
          </div>
          <div>
            <Image
              className={styles.image}
              src="./images/common2.svg"
              alt="chat image"
              width={800}
              height={500}
            />
            <h5>Common Ground</h5>
            <p>
              It makes easier to build a strong foundation for a relationship.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
