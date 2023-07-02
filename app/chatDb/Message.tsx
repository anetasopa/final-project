'use client';

import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import styles from './Message.module.scss';

export default function Message({
  messages,
  setMessages,
  inputMessage,
  setInputMessage,
  userId,
  receiverId,
  // messageText,
  // setMessageText,
  // publicFromClientHandler,
}) {
  // const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const [error, setError] = useState<string>('');
  const router = useRouter();

  async function saveMessages() {
    if (userId && receiverId) {
      const smallerId = Math.min(userId, receiverId);
      const biggerId = Math.max(userId, receiverId);
      const key = `users/${smallerId}-${biggerId}`;

      const newMessages = [...messages];

      newMessages.push({
        creatorUserId: userId,
        receiverUserId: receiverId,
        message: inputMessage,
      });
      set(ref(db, key), newMessages);
    }

    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify({
        userId,
        receiverId,
        inputMessage,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
    }

    if ('user' in data) {
      router.push(`profile/${data.user.username}`);
      router.refresh();
    }
  }

  return (
    <form
      className={styles.messageForm}
      onSubmit={(event) => event.preventDefault()}
      role="search"
    >
      <label className={styles.messageLabel} htmlFor="search">
        Search for stuff
      </label>
      <input
        className={styles.messageInput}
        onChange={(e) => setInputMessage(e.target.value)}
        id="search"
        type={inputMessage}
        placeholder="Message..."
        required
      />

      {/* <p className={styles.message}>
        {' '}
        {messages.map((m) => (
          <p>{m.message}</p>
        ))}
      </p> */}
      <button
        className={styles.messageButton}
        onClick={async () => {
          await saveMessages();
        }}
        // onClick={() => {
        //   if (userId && receiverId) {
        //     const smallerId = Math.min(userId, receiverId);
        //     const biggerId = Math.max(userId, receiverId);
        //     const key = `users/${smallerId}-${biggerId}`;

        //     const newMessages = [...messages];

        //     newMessages.push({
        //       creatorUserId: userId,
        //       receiverUserId: receiverId,
        //       message: inputMessage,
        //     });
        //     set(ref(db, key), newMessages);
        //   }
        // }}
      >
        {/* Send */}
        <BsSend className={styles.sendIcon} />
      </button>
    </form>
  );
}
