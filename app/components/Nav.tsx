'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { use, useState } from 'react';
import { CgClose, CgProfile } from 'react-icons/cg';
import { RiLoginCircleLine } from 'react-icons/ri';
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

        {/* <div
          className={`${styles.navigation} ${isOpen ? styles[`navOpen`] : {}} `}
        >
          <ul className={styles.tekst}>
            {links.map(({ id, title, link }) => (
              <Link href={link} key={`key-${id}`}>
                <li>{title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <button className={styles.hamburgerIcon} onClick={handleMenuToggle}>
          {!isOpen ? 'o' : 'x'}
        </button> */}

        <div>
          <Link href="/" className={styles.logo}>
            ChatSync
          </Link>
        </div>

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
