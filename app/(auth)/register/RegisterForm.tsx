'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';
import styles from './RegisterForm.module.scss';

type ZodError = {
  field?: string | number;
  message: string;
};

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string | ZodError[]>('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  type Props = {
    setError: () => void;
    setIsLoading: any;
  };
  const testmessage = 'test message';
  let errorMessageUsername;

  async function register() {
    setIsLoading(true);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });

    const data: RegisterResponseBodyPost = await response.json();

    if ('errors' in data) {
      if (typeof data.errors === 'string') {
        setErrors(data.errors);
      }

      if (Array.isArray(data.errors)) {
        const pathToCollect = data?.errors;
        console.log(pathToCollect);
        const zodErrors = pathToCollect.map((entry) => {
          return { field: entry.path[0], message: entry.message };
        });
        console.log(zodErrors[0]?.message);

        setErrors(zodErrors);
      }
      return;
    }

    if ('user' in data) {
      setErrors('');
    }

    setIsLoading(false);
    router.refresh();
    // setUsername('');
    // setEmail('');
    // setPassword('');
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
        />
        {/* {getError('userName')} */}
        {/* {renderError(error, 'userName')} */}
        {typeof errors !== 'string' && (
          <div className={styles.errorContainer}>
            {errors
              .filter((error) => error.field === 'username')
              .map((error) => (
                <div className={styles.errorMessage}>
                  <p>{error.message}</p>
                  {/* <FaExclamationCircle className={styles.icon} /> */}
                </div>
              ))}
          </div>
        )}
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        {typeof errors !== 'string' && (
          <div className={styles.errorContainer}>
            {errors
              .filter((error) => error.field === 'email')
              .map((error) => (
                <div className={styles.errorMessage}>
                  <p>{error.message}</p>
                  {/* <FaExclamationCircle className={styles.icon} /> */}
                </div>
              ))}
          </div>
        )}
        <label htmlFor="password">Password</label>
        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {typeof errors !== 'string' && (
            <div className={styles.errorContainer}>
              {errors
                .filter((error) => error.field === 'password')
                .map((error) => (
                  <div className={styles.errorMessage}>
                    <p>{error.message}</p>
                    {/* <FaExclamationCircle className={styles.icon} /> */}
                  </div>
                ))}
            </div>
          )}
        </div>
        <button
          className={styles.buttonSignUp}
          onClick={async () => {
            await register();
          }}
        >
          {isLoading ? (
            <div className={styles.spinner}>
              <p className={styles.loader}>Loading...</p>
            </div>
          ) : (
            <p>Sign Up</p>
          )}
        </button>
      </form>
    </div>
  );
}
