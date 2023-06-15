'use client';

import Link from 'next/link';
import React from 'react';
import styles from './Nav.module.scss';

const links = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'About', link: '/#about' },
  { id: 3, title: 'Benefits', link: '#benefits' },
];

export default function Nav({ setOpenModal }) {
  return (
    <header className={styles.header}>
      <nav>
        <div>
          <Link href="/" className={styles.logo}>
            ChatSync
          </Link>
        </div>
        <ul>
          {links.map(({ id, title, link }) => (
            <Link href={link} key={`key-${id}`}>
              <li className={styles.link}>{title}</li>
            </Link>
          ))}
        </ul>
        <li>
          <button
            onClick={() => {
              setOpenModal(true);
            }}
            className={styles.buttonSignup}
          >
            Register
          </button>
        </li>
      </nav>
    </header>
  );
}
