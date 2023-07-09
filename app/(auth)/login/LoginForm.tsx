'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);
  const router = useRouter();

  async function login() {
    setIsLoading(true);
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
    }

    if ('user' in data) {
      setIsLoggedIn(true);
      router.push(`profile/${data.user.username}`);
      router.refresh();
    }

    setIsLoading(false);

    setUsername('');
    setPassword('');
  }

  const handleClick = () => {
    setLinkClicked(true);
  };

  return (
    <div className={styles.containerLogIn}>
      {isLoggedIn ? (
        <div>
          <p>
            You logged in successfully! You will be redirected to your profile
            page in few seconds.
          </p>
        </div>
      ) : (
        <>
          <Link href="/">
            <div className={styles.closeIcon}>
              <IoMdClose />
            </div>
          </Link>
          <div>
            <p className={styles.textAccount}>Account</p>
            <div className={styles.buttons}>
              <Link
                onClick={handleClick}
                style={{ color: linkClicked ? '#6bd9ec' : 'inherit' }}
                className={styles.link}
                href="/login"
              >
                Login
              </Link>
              <Link
                className={`${styles.link} ${styles.buttonRight}`}
                href="/register"
              >
                Register
              </Link>
            </div>
          </div>
          <form
            className={styles.form}
            onSubmit={(event) => event.preventDefault()}
            id="login"
          >
            <label htmlFor="email">User name</label>
            <input
              data-test-id="login-username"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
              required
            />
            {error !== '' && (
              <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>{' '}
                <FaExclamationCircle className={styles.icon} />
              </div>
            )}
            <label htmlFor="password">Password</label>
            <div>
              <input
                data-test-id="login-password"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {error !== '' && (
                <div className={styles.errorContainer}>
                  <p className={styles.errorMessage}>{error}</p>{' '}
                  <FaExclamationCircle className={styles.icon} />
                </div>
              )}
            </div>
            <button
              className={styles.buttonLogIn}
              onClick={async () => {
                await login();
              }}
            >
              {isLoading ? (
                <div className={styles.spinner}>
                  <div className={styles.loader} />
                </div>
              ) : (
                <p>Log In</p>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
