'use client';

import { getDatabase, ref, set } from 'firebase/database';
import { BsSend } from 'react-icons/bs';
import { FirebaseMessage } from './ChatForm';
import styles from './Message.module.scss';

type RenderMessageProps = {
  messages: FirebaseMessage[];
  inputMessage: string;
  setInputMessage: (value: string) => void;
  receiverId: number | null;
  userId: number;
};

export default function Message({
  messages,
  inputMessage,
  setInputMessage,
  userId,
  receiverId,
}: RenderMessageProps) {
  // const app = initializeApp(firebaseConfig);
  const db = getDatabase();

  const saveMessages = async () => {
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

      await set(ref(db, key), newMessages);
    }
  };

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
      <button
        className={styles.messageButton}
        onClick={async () => {
          await saveMessages();
        }}
      >
        {/* Send */}
        <BsSend className={styles.sendIcon} />
      </button>
    </form>
  );
}
