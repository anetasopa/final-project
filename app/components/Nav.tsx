import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { logout } from '../(auth)/logout/actions';
import { LogoutButton } from './LogoutButton';
import styles from './Nav.module.scss';

const links = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'About', link: '/#about' },
  { id: 3, title: 'Benefits', link: '#benefits' },
];

export default function Nav({ user }) {
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

        {user ? (
          <>
            <LogoutButton logout={logout} />
            <p>{user.username}</p>
            <Image
              alt="userImage"
              src="/images/photo2.jpeg"
              width={50}
              height={50}
              className={styles.profileImage}
            />
          </>
        ) : (
          <Link className={styles.buttonSignup} href="/register">
            Register
          </Link>
        )}
      </nav>
    </header>
  );
}
