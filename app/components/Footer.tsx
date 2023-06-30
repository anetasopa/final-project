'use client';

// import { getAnalytics } from 'firebase/analytics';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, onValue, ref, set } from 'firebase/database';
// import { useEffect, useState } from 'react';
import styles from './Footer.module.scss';

export default function Footer() {
  // const [messages, setMessages] = useState([]);
  // const firebaseConfig = {
  //   apiKey: 'AIzaSyCSEd5Cqxqzl6VEv6qCdk5whr97NnIjJqI',
  //   authDomain: 'project-b1ff0.firebaseapp.com',
  //   databaseURL:
  //     'https://project-b1ff0-default-rtdb.europe-west1.firebasedatabase.app',
  //   projectId: 'project-b1ff0',
  //   storageBucket: 'project-b1ff0.appspot.com',
  //   messagingSenderId: '130075160058',
  //   appId: '1:130075160058:web:b009ec5984257a607c0843',
  //   measurementId: 'G-KMCLT32EZ7',
  // };

  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  // const database = getDatabase(app);

  // const db = getDatabase();
  // set(ref(db, 'users/1-2'), [
  //   {
  //     creatorUserId: 1,
  //     receiverUserId: 2,
  //     message: 'Hey',
  //   },
  //   {
  //     creatorUserId: 2,
  //     receiverUserId: 1,
  //     message: 'Whats up?',
  //   },
  // ]);

  // useEffect(() => {
  //   const starCountRef = ref(db, 'users/1-3');
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();

  //     console.log(data);

  //     setMessages(data ? data : []);
  //   });
  // }, []);

  return (
    <div className={styles.containerFooter}>
      {/* <button
        onClick={() => {
          const newMessages = [...messages];

          newMessages.push({
            creatorUserId: 1,
            receiverUserId: 2,
            message: 'Hey',
          });
          set(ref(db, 'users/1-3'), newMessages);
        }}
      >
        Add message
      </button>
      {messages.map((m) => (
        <li>{m.message}</li>
      ))} */}
    </div>
  );
}
