import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main>
      <section id="#" className={styles.heroContainer}>
        <Image
          className={styles.image}
          src="./images/chat.svg"
          alt="chat image"
          width={700}
          height={400}
        />
        <div className={styles.heroContainerText}>
          <h1 className={styles.heroH1}>
            Connecting You with Your Perfect Match!
          </h1>
          <p className={styles.heroPar}>
            Unleash the power of shared interests and let your true self shine.
          </p>
          <div>
            <Link className={styles.heroButton} href="/register">
              Get started
            </Link>
          </div>
        </div>
      </section>

      <section id="about" className={styles.aboutUsContainer}>
        <h3>About</h3>
        <p>
          We understand the importance of shared passions and compatible
          personalities. <span>ChatSync</span> is a revolutionary app that
          brings together individuals who share common hobbies, goals, and
          values. Say goodbye to superficial small talk and hello to deep,
          meaningful conversations with like-minded souls.
        </p>
      </section>

      <section id="benefits" className={styles.benefitsContainer}>
        <h3>Benefits</h3>
        <div className={styles.benefits}>
          <Image
            className={styles.image}
            src="./images/common2.svg"
            alt="chat image"
            width={600}
            height={400}
          />
          <div className={styles.benefitsText}>
            <h5>Common Ground</h5>
            <p>
              Finding someone who understands your interests can be challenging.
              Our app eliminates the guesswork, connecting you with individuals
              who already share common ground, making it easier to build a
              strong foundation for a relationship.
            </p>
          </div>
        </div>
        <div className={`${styles.benefits} ${styles.reverse}`}>
          <Image
            className={styles.image}
            src="./images/growth2.svg"
            alt="chat image"
            width={500}
            height={300}
          />
          <div className={styles.benefitsText}>
            <h5>Inspiring Growth</h5>
            <p>
              Interacting with others who share your interests can be incredibly
              inspiring. You'll have the opportunity to learn from each other,
              discover new perspectives, and expand your horizons together.
            </p>
          </div>
        </div>
        <div className={styles.benefits}>
          <Image
            className={styles.image}
            src="./images/support2.svg"
            alt="chat image"
            width={700}
            height={500}
            style={{ marginTop: '-150px' }}
          />
          <div className={styles.benefitsText}>
            <h5>Support and Encouragement</h5>
            <p>
              Connecting with individuals who share your interests can offer a
              strong support system. You can find encouragement, motivation, and
              inspiration from like-minded peers who understand your passion.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
