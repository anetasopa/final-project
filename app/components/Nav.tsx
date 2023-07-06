'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';
import { logout } from '../(auth)/logout/actions';
import { User, UserEntity } from '../../migrations/1686751602-createTableUsers';
import { LogoutButton } from './LogoutButton';
import styles from './Nav.module.scss';

type Props = {
  user: UserEntity | undefined;
  singleUserData: User[] & { imageUrl: string };
};

type LinkObj = {
  id: number;
  title: string;
  link: string;
};

const links: LinkObj[] = [
  { id: 1, title: 'Home', link: '/' },
  { id: 2, title: 'About', link: '#about' },
  { id: 3, title: 'Benefits', link: '#benefits' },
];

export default function Nav({ user, singleUserData }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <nav>
        <div className={`${styles.nav} ${isOpen ? styles[`navOpen`] : {}}`}>
          <ul className={styles.navLinks}>
            {links.map((link) => (
              <Link href={link.link} key={`key-${link.id}`}>
                <li>{link.title}</li>
              </Link>
            ))}
          </ul>
        </div>
        <button onClick={handleMenuToggle} className={styles.hamburgerIcon}>
          {isOpen ? <RxHamburgerMenu /> : <CgClose />}
        </button>

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
          <Link className={styles.buttonRegister} href="/register">
            Register/Login
          </Link>
        )}
      </nav>
    </header>
  );
}
