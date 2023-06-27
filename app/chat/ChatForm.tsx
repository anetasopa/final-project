'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import styles from './ChatForm.module.scss';
import Message from './Message';

export default function ChatForm({ user }) {
  const [message, setMessage] = useState('');

  return (
    <>
      <div className={styles.list}>
        <div className={styles.dataContainer}>
          <div className={styles.data}>
            <Image
              alt="userImage"
              src="/images/photo2.jpeg"
              width={50}
              height={50}
              className={styles.userImage}
            />
            <div className={styles.availability}></div>
            <p className={styles.name}>{user.username}</p>
          </div>
          <div className={styles.editIcon}>
            <FaPen />
          </div>
        </div>
      </div>
      <div className={styles.chat}>
        <div>Chat</div>
        <Message message={message} setMessage={setMessage} />
      </div>
    </>
  );
}
