'use client';

import { configureAbly } from '@ably-labs/react-hooks';
import * as Ably from 'ably/promises';
import dotenv from 'dotenv';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { User } from '../../database/users';
import SaveMessagesResponseBodyPost from '../api/(auth)/messages/route';
import Chat, { LogEntry } from './Chat';
import styles from './ChatForm.module.scss';
import Message from './Message';
import Profile from './Profile';

dotenv.config();

interface ChatFormProps {
  userContacts: User[];
}

export default function ChatForm({ userContacts }: ChatFormProps) {
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState(null);

  const getReceiverID = (userID) => {
    // const user = userID;
    setReceiverId(userID);
    console.log('userID is clicked: ', userID);
  };

  const [logs, setLogs] = useState<Array<LogEntry>>([]);
  const [channel, setChannel] =
    useState<Ably.Types.RealtimeChannelPromise | null>(null);
  const [messageText, setMessageText] = useState<string>('');

  useEffect(() => {
    const ably: Ably.Types.RealtimePromise = configureAbly({
      authUrl: '/api/authentication',
    });

    ably.connection.on((stateChange: Ably.Types.ConnectionStateChange) => {
      console.log(stateChange);
    });

    const _channel = ably.channels.get('status-updates');

    _channel.subscribe((message: Ably.Types.Message) => {
      setLogs((prev) => [...prev, new LogEntry(message.data.text)]);
    });
    setChannel(_channel);

    return () => {
      _channel.unsubscribe();
    };
  }, []); // Only run the client

  const publicFromClientHandler: MouseEventHandler = async (
    _event: MouseEvent<HTMLButtonElement>,
  ) => {
    // try {
    //   if ((await response).status !== 500) {
    //     const data: SaveMessagesResponseBodyPost = await (
    //       await response
    //     ).json();
    //     if ('error' in data) {
    //       console.log(data.error);
    //     }
    //     if ('user' in data) {
    //       console.log(data.user);
    //     }
    //   }
    // } catch (e) {
    //   console.log({ e });
    // }
    if (channel === null) return;
    await channel.publish('update-from-client', {
      text: messageText,
      // text: `${messageText} @ ${new Date().toISOString()}`,
    });
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
                <Link
                  onClick={() => getReceiverID(user.userId)}
                  href="/chatAbly"
                >
                  <p className={styles.name}>{user.username}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.chat}>
        {messages.map((m) => (
          <li key={`message-${m}`}>{m.message}</li>
        ))}
        <Profile userContacts={userContacts} receiverId={receiverId} />
        <div className={styles.messages}>
          <Chat logEntries={logs} />
        </div>
        <Message
          messages={messages}
          messageText={messageText}
          setMessageText={setMessageText}
          publicFromClientHandler={publicFromClientHandler}
        />
      </div>
    </>
  );
}
