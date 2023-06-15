'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { LoginResponseBodyPost } from '../api/(auth)/login/route';
import styles from './Login.module.scss';

export default function Login(props: {
  onFormSwitch: (login: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  console.log({ error });

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const data: LoginResponseBodyPost = await response.json();

    console.log({ data });

    if ('error' in data) {
      setError(data.error);
    }

    if ('user' in data) {
      setError(data.user);
      router.push(`profile2/${data.user.userName}`);
      router.refresh();
    }
  }

  return (
    <div className={styles.containerLogIn}>
      <div>
        <p className={styles.textAccount}>Account</p>
        <div className={styles.buttons}>
          <button>Log in</button>
          <button
            className={styles.buttonRight}
            onClick={() => props.onFormSwitch('signup')}
          >
            Sign up
          </button>
        </div>
      </div>

      <form
        className={styles.form}
        onSubmit={(event) => event.preventDefault()}
        id="login"
      >
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
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
          className={styles.buttonLogIn}
          onClick={async () => {
            await login();
          }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
