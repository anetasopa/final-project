'use client';
import { useState } from 'react';
import styles from './Login.module.scss';

// import styles from './Login.module.scss';

export default function Login(props: { onFormSwitch: (arg0: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <label htmlFor="password">Password</label>
        <div>
          <input
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button className={styles.buttonLogIn}>Log in</button>
      </form>
    </div>
  );
}
