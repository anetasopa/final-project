'use client';

import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { User } from '../../migrations/1686751602-createTableUsers';
import Chat from './Chat';
import styles from './ChatForm.module.scss';
import Message from './Message';
import Profile from './Profile';

dotenv.config();

interface ChatFormProps {
  userId: number;
  userContacts: User[];
  firebaseConfig: any;
  userData: User;
}

export type FirebaseMessage = {
  message: string;
  creatorUserId: number;
  receiverUserId: number;
};

export default function ChatForm({
  userId,
  userContacts,
  firebaseConfig,
  userData,
}: ChatFormProps) {
  const [messages, setMessages] = useState<FirebaseMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  initializeApp(firebaseConfig);

  const db = getDatabase();

  useEffect(() => {
    if (receiverId === null) return;

    const smallerId = Math.min(userId, receiverId);
    const biggerId = Math.max(userId, receiverId);
    const key = `users/${smallerId}-${biggerId}`;

    const starCountRef = ref(db, key);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setMessages(data ? data : []);
    });
  }, [userId, receiverId, db]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div
        className={`${styles.list} ${
          isMobileMenuOpen ? styles.mobileOpen : ''
        }`}
      >
        {userContacts.map((user) => {
          return (
            <div key={`user-${user.id}`} className={styles.dataContainer}>
              <div className={styles.data}>
                {user.imageUrl ? (
                  <Image
                    alt="userImage"
                    src={user.imageUrl}
                    width={50}
                    height={50}
                    className={styles.userImage}
                  />
                ) : null}
                <div className={styles.availability} />
                <button
                  className={styles.buttonName}
                  onClick={() => setReceiverId(user.userId)}
                >
                  <p className={styles.name}>{user.username}</p>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.chat} ${
          isMobileMenuOpen ? styles.mobileOpen : ''
        }`}
      >
        <Profile
          userContacts={userContacts}
          receiverId={receiverId}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        <div className={styles.messages}>
          <Chat
            userContacts={userContacts}
            userData={userData}
            messages={messages}
            userId={userId}
            receiverId={receiverId}
          />
        </div>
        <Message
          messages={messages}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          userId={userId}
          receiverId={receiverId}
        />
      </div>
    </>
  );
}
