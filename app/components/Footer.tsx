import Link from 'next/link';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.navigation}>
        <Link href="/">Home</Link>
        <Link href="#about">About</Link>
        <Link href="#benefits">Benefits</Link>
      </div>
      <div className={styles.socialMediaLinks}>
        <a
          href="https://twitter.com/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com/example"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
      <div className={styles.attribution}>
        &copy; 2023 Your App <span>ChatSync</span>
      </div>
    </footer>
  );
}
