'use client';

import dotenv from 'dotenv';
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '../../database/users';
import firebase from '../../util/firebase';
import Chat from './Chat';
import styles from './ChatForm.module.scss';
import Message from './Message';
import Profile from './Profile';

dotenv.config();

interface ChatFormProps {
  user: User;
  userId: string;
  userContacts: User[];
  firebaseConfig: any;
  userData: number;
}

export default function ChatForm({
  user,
  userId,
  userContacts,
  firebaseConfig,
  userData,
}: ChatFormProps) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [receiverId, setReceiverId] = useState(null);

  // const firebaseConfig = firebase;

  const getReceiverID = (userID) => {
    setReceiverId(userID);
    console.log('userID is clicked: ', userID);
  };

  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // const database = getDatabase(app);

  const db = getDatabase();

  useEffect(() => {
    if (userId !== null && receiverId !== null) {
      const smallerId = Math.min(userId, receiverId);
      const biggerId = Math.max(userId, receiverId);
      const key = `users/${smallerId}-${biggerId}`;

      const starCountRef = ref(db, key);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        setMessages(data ? data : []);
      });
    }
  }, [userId, receiverId]);

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
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
                <Image
                  alt="userImage"
                  src={user.imageUrl}
                  width={50}
                  height={50}
                  className={styles.userImage}
                />
                <div className={styles.availability} />
                <Link onClick={() => getReceiverID(user.userId)} href="/chat">
                  <p className={styles.name}>{user.username}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <button className={styles.mobileButton} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <p>Show List</p> : <p>Hide List</p>}
      </button>
      <div
        className={`${styles.chat} ${
          isMobileMenuOpen ? styles.mobileOpen : ''
        }`}
      >
        <Profile userContacts={userContacts} receiverId={receiverId} />
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
