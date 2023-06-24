'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { use, useState } from 'react';
import { logout } from '../(auth)/logout/actions';
import { User } from '../../database/users';
import HamburgerMenu, { Links } from './HamburgerMenu';
import { LogoutButton } from './LogoutButton';
import styles from './Nav.module.scss';

const links = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'About', link: '/#about' },
  { id: 3, title: 'Benefits', link: '#benefits' },
];

export default function Nav({ user, singleUserData }) {
  // const [menuOpen, setMenuOpen] = useState(false);
  // const click = () => setMenuOpen((prev) => !prev);`

  return (
    <header className={styles.header}>
      <nav>
        <div>
          <Link href="/" className={styles.logo}>
            ChatSync
          </Link>
        </div>

        {/* <div className={`${styles.nav} ${menuOpen ? styles[`navOpen`] : {}} `}> */}
        <ul className={styles.navLinks}>
          {links.map(({ id, title, link }) => (
            <Link href={link} key={`key-${id}`}>
              <li>{title}</li>
            </Link>
          ))}
        </ul>
        {/* </div> */}
        {/* <button className={styles.hamburgerIcon} onClick={click}>
          {!menuOpen ? 'o' : 'x'}
        </button> */}

        {/*
        <div className="max-w-full h-12 flex justify-start items-center bg-black mb-4 text-white rounded-md ">
          <div className="flex md:hidden">
            <HamburgerMenu />
          </div>
          <div className="hidden md:flex">
            <Links />
          </div>
        </div> */}

        {user ? (
          <>
            <LogoutButton logout={logout} />
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
