'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';
import { logout } from '../(auth)/logout/actions';
import { LogoutButton } from './LogoutButton';
import styles from './Nav.module.scss';

const links = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'About', link: '/#about' },
  { id: 3, title: 'Benefits', link: '#benefits' },
];

export default function Nav({ user, singleUserData }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <nav>
        <div className={`${styles.nav} ${isOpen ? styles[`navOpen`] : {}}`}>
          <ul className={styles.navLinks}>
            {links.map(({ id, title, link }) => (
              <Link href={link} key={`key-${id}`}>
                <li>{title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <button onClick={handleMenuToggle} className={styles.hamburgerIcon}>
          {isOpen ? <RxHamburgerMenu /> : <CgClose />}
        </button>

        {!user ? (
          <div>
            <Link href="/" className={styles.logo}>
              ChatSync
            </Link>
          </div>
        ) : null}

        {user ? (
          <>
            <Link
              className={styles.profileLink}
              href={`/profile/${user.username}`}
            >
              <p className={styles.profileLinkName}>{user.username}</p>
              <Image
                alt="userImage"
                src={singleUserData.imageUrl}
                width={50}
                height={50}
                className={styles.profileImage}
              />
            </Link>
            <LogoutButton logout={logout} />
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
