'use client';

import Link from 'next/link';
import { useState } from 'react';
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
  const [linkClicked, setLinkClicked] = useState(false);

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
        const pathToCollect = data.errors;
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
    // router.refresh();
    // setUsername('');
    // setEmail('');
    // setPassword('');
  }

  const handleClick = () => {
    setLinkClicked(true);
  };

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
            onClick={handleClick}
            style={{ color: linkClicked ? '#6bd9ec' : 'inherit' }}
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
        id="signup"
      >
        <label htmlFor="userName">User name</label>
        <input
          data-test-id="register-username"
          id="userName"
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
        {typeof errors !== 'string' && (
          <div className={styles.errorContainer}>
            {errors
              .filter((error) => error.field === 'username')
              .map((error) => (
                <div key="errorMessage" className={styles.errorMessage}>
                  <p>{error.message}</p>
                  {/* <FaExclamationCircle className={styles.icon} /> */}
                </div>
              ))}
          </div>
        )}
        <label htmlFor="email">Email Address</label>
        <input
          data-test-id="register-email"
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
                <div
                  key={`error-${error.message}`}
                  className={styles.errorMessage}
                >
                  <p>{error.message}</p>
                  {/* <FaExclamationCircle className={styles.icon} /> */}
                </div>
              ))}
          </div>
        )}
        <label htmlFor="password">Password</label>
        <div>
          <input
            data-test-id="register-password"
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
                  <div
                    key={`error-${error.message}`}
                    className={styles.errorMessage}
                  >
                    <p>{error.message}</p>
                    {/* <FaExclamationCircle className={styles.icon} /> */}
                  </div>
                ))}
            </div>
          )}
        </div>
        <button
          className={styles.buttonRegister}
          onClick={async () => {
            await register();
          }}
        >
          {isLoading ? (
            <div className={styles.spinner}>
              <p className={styles.loader}>Loading...</p>
            </div>
          ) : (
            <p>Register</p>
          )}
        </button>
      </form>
    </div>
  );
}
