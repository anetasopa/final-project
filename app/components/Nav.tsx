'use client';

import Link from 'next/link';
import React from 'react';
import styles from './Nav.module.scss';

const links = [
  { id: 1, title: 'ChatSync', link: '/' },
  { id: 2, title: 'Home', link: '/' },
  { id: 3, title: 'About Us', link: '#aboutUs' },
];

export default function Nav({ setOpenModal }) {
  return (
    <header className={styles.header}>
      <nav>
        <div>
          <Link href="/" className={styles.logo}>
            {links[0]?.title}
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
            SignUp
          </button>
        </li>
      </nav>
    </header>
  );
}
