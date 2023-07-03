'use client';

import dotenv from 'dotenv';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { User } from '../../database/users';
import Chat from './Chat';
import styles from './ChatForm.module.scss';
import Message from './Message';
import Profile from './Profile';

dotenv.config();

interface ChatFormProps {
  userId: string;
  userContacts: User[];
  userData: number;
  usersMessages: any;
}

export default function ChatForm({
  userId,
  userContacts,
  userData,
  usersMessages,
}: ChatFormProps) {
  const content = usersMessages.map((con) => con.content);
  const creatorUserIds = usersMessages.map((creator) => creator.creatorUserId);
  const receiverUserIds = usersMessages.map(
    (receiver) => receiver.receiverUserId,
  );

  console.log(usersMessages, content, creatorUserIds, receiverUserIds);
  const [inputMessage, setInputMessage] = useState('');
  console.log({ inputMessage12345678: inputMessage });
  const [receiverId, setReceiverId] = useState(null);

  const getReceiverID = (userID) => {
    setReceiverId(userID);
  };

  return (
    <>
      <div className={styles.list}>
        {userContacts.map((user) => {
          return (
            <div key={`user-${user.userId}`} className={styles.dataContainer}>
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
      <div className={styles.chat}>
        <Profile userContacts={userContacts} receiverId={receiverId} />

        <div className={styles.messages}>
          <Chat
            usersMessages={usersMessages}
            userContacts={userContacts}
            userData={userData}
            inputMessage={inputMessage}
            userId={userId}
            receiverId={receiverId}
          />
        </div>
        <Message
          inputMessage={inputMessage}
          usersMessages={usersMessages}
          setInputMessage={setInputMessage}
          userId={userId}
          receiverId={receiverId}
        />
      </div>
    </>
  );
}
