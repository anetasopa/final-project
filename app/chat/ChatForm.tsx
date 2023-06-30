'use client';

import { configureAbly } from '@ably-labs/react-hooks';
import * as Ably from 'ably/promises';
import dotenv from 'dotenv';
import { getAnalytics } from 'firebase/analytics';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { getUserContacts } from '../../database/users';
import firebase from '../../util/firebase';
import { CreateResponseBodyPost } from '../api/(auth)/messages/route';
// import Layout from '../components/layout';
import Chat, { LogEntry } from './Chat';
// import homeStyles from '../styles/Home.module.css';
import styles from './ChatForm.module.scss';
import Message from './Message';

dotenv.config();

export default function ChatForm({
  user,
  userId,
  userContacts,
  firebaseConfig,
}) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  console.log({ userContacts });
  console.log({ key123456: process.env.FIREBASE_API_KEY });

  const [receiverId, setReceiverId] = useState(null);
  console.log('receiverId12345', receiverId);

  //const firebaseConfig = firebase;

  const getReceiverID = (userID) => {
    // const user = userID;
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

  // useEffect(() => {
  //   const starCountRef = ref(db, `users/24-${userId}`);
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();

  //     console.log('data from chatform ', data);

  //     setMessages(data ? data : []);
  //   });
  // }, []);

  // const [logs, setLogs] = useState<Array<LogEntry>>([]);
  // const [channel, setChannel] =
  //   useState<Ably.Types.RealtimeChannelPromise | null>(null);
  // const [messageText, setMessageText] = useState<string>('');

  // useEffect(() => {
  //   const ably: Ably.Types.RealtimePromise = configureAbly({
  //     authUrl: '/api/authentication',
  //   });

  //   ably.connection.on((stateChange: Ably.Types.ConnectionStateChange) => {
  //     console.log(stateChange);
  //   });

  //   const _channel = ably.channels.get('status-updates');

  //   _channel.subscribe((message: Ably.Types.Message) => {
  //     setLogs((prev) => [...prev, new LogEntry(message.data.text)]);
  //   });
  //   setChannel(_channel);

  //   return () => {
  //     _channel.unsubscribe();
  //   };
  // }, []); // Only run the client

  // const publicFromClientHandler: MouseEventHandler = async (
  //   _event: MouseEvent<HTMLButtonElement>,
  // ) => {
  //   try {
  //     const response = fetch('/api/messages', {
  //       method: 'POST',
  //       body: JSON.stringify({ messageText }),
  //     });

  //     if ((await response).status !== 500) {
  //       const data: CreateResponseBodyPost = await (await response).json();

  //       if ('error' in data) {
  //         console.log(data.error);
  //       }

  //       if ('user' in data) {
  //         console.log(data.user);
  //       }
  //     }
  //   } catch (e) {
  //     console.log({ e });
  //   }
  //   if (channel === null) return;
  //   channel.publish('update-from-client', {
  //     text: messageText,
  //     // text: `${messageText} @ ${new Date().toISOString()}`,
  //   });
  // };

  return (
    <>
      <div className={styles.list}>
        {userContacts.map((user) => {
          return (
            <div className={styles.dataContainer}>
              <div className={styles.data}>
                <Image
                  alt="userImage"
                  src={user.imageUrl}
                  width={50}
                  height={50}
                  className={styles.userImage}
                />
                <div className={styles.availability}></div>
                <Link onClick={() => getReceiverID(user.userId)} href="/chat">
                  <p className={styles.name}>{user.username}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.chat}>
        {/* {messages.map((m) => (
        <li>{m.message}</li>
      ))} */}
        {/* {messages.map((m) => (
          <li>{m.message}</li>
        ))} */}
        <div className={styles.messages}>
          <Chat
            // logEntries={logs}
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
          // messageText={messageText}
          // setMessageText={setMessageText}
          // publicFromClientHandler={publicFromClientHandler}
        />
      </div>
    </>
  );
}
