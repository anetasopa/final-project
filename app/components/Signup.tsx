'use client';
import { useState } from 'react';
import styles from './Signup.module.scss';

export default function Signup(props: {
  onFormSwitch: (arg0: string) => void;
}) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.containerSignUp}>
      <div>
        <p className={styles.textCreateAccount}>Create Account</p>
        <div className={styles.buttons}>
          <button onClick={() => props.onFormSwitch('login')}>Log in</button>
          <button className={styles.buttonRight}>Sign up</button>
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
          placeholder="&nbsp;"
          value={userName}
          onChange={(event) => setUserName(event.currentTarget.value)}
          required
        />
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
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
        <button className={styles.buttonSignUp}>Sign Up</button>
      </form>
    </div>
  );
}
