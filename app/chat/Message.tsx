'use client';

import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
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
  console.log('messages', messages);
  console.log('receiverID, Message COMPONENT', receiverId);
  const db = getDatabase();
  console.log('inputMessage', inputMessage);
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
        onClick={() => {
          if (userId && receiverId) {
            const smallerId = Math.min(userId, receiverId);
            const biggerId = Math.max(userId, receiverId);
            const key = `users/${smallerId}-${biggerId}`;

            const newMessages = [...messages];

            newMessages.push({
              creatorUserId: userId,
              receiverUserId: receiverId,
              message: inputMessage,
              time: Date.now(),
            });
            set(ref(db, key), newMessages);
          }
        }}
      >
        {/* Send */}
        <BsSend className={styles.sendIcon} />
      </button>
    </form>
  );
}
