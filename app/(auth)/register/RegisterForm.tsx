'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './RegisterForm.module.scss';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');

  async function RegisterForm() {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
    }

    if ('user' in data) {
      setError(data.user);
    }
  }

  return (
    <div className={styles.containerSignUp}>
      <Link href="/">
        <div className={styles.closeIcon}>
          <IoMdClose />
        </div>
      </Link>
      <div>
        <p className={styles.textCreateAccount}>Create Account</p>
        <div className={styles.buttons}>
          <Link className={styles.link} href="/login">
            Login
          </Link>
          <Link
            className={`${styles.link} ${styles.buttonRight}`}
            href="/register"
          >
            Signup
          </Link>
        </div>
      </div>

      <form
        className={styles.form}
        onSubmit={(event) => event.preventDefault()}
        id="signup"
      >
        <label htmlFor="userName">User name</label>
        <input
          id="userName"
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
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
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
          className={styles.buttonSignUp}
          onClick={async () => {
            await register();
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
