'use client';

import { BsSend } from 'react-icons/bs';
import styles from './Message.module.scss';

export default function Message({ message, setMessage }) {
  return (
    <form
      className={styles.messageForm}
      onSubmit={(event) => event.preventDefault()}
      role="search"
    >
      <label className={styles.messageLabel} for="search">
        Search for stuff
      </label>
      <input
        className={styles.messageInput}
        onChange={(e) => setMessage(e.target.value)}
        id="search"
        type={message}
        placeholder="Message..."
        autofocus
        required
      />
      <button className={styles.messageButton} type="submit">
        Send
        {/* <BsSend className={styles.sendIcon} /> */}
      </button>
    </form>
  );
}
