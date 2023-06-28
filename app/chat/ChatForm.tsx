'use client';

import { configureAbly } from '@ably-labs/react-hooks';
import * as Ably from 'ably/promises';
import Image from 'next/image';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { FaPen } from 'react-icons/fa';
// import homeStyles from '../styles/Home.module.css';
import styles from './ChatForm.module.scss';
// import Layout from '../components/layout';
import Logger, { LogEntry } from './Logger';
import Message from './Message';

export default function ChatForm({ user }) {
  const [message, setMessage] = useState('');
  const [logs, setLogs] = useState<Array<LogEntry>>([]);
  const [channel, setChannel] =
    useState<Ably.Types.RealtimeChannelPromise | null>(null);
  const [messageText, setMessageText] = useState<string>('A message');

  useEffect(() => {
    const ably: Ably.Types.RealtimePromise = configureAbly({
      authUrl: '/api/authentication',
    });

    ably.connection.on((stateChange: Ably.Types.ConnectionStateChange) => {
      console.log(stateChange);
    });

    const _channel = ably.channels.get('status-updates');

    // _channel.subscribe((message: Ably.Types.Message) => {
    //   setLogs(['message income']);
    // });

    _channel.subscribe((message: Ably.Types.Message) => {
      setLogs((prev) => [
        ...prev,
        new LogEntry(
          `✉️ event name: ${message.name} text: ${message.data.text}`,
        ),
      ]);
    });
    setChannel(_channel);

    return () => {
      _channel.unsubscribe();
    };
  }, []); // Only run the client

  const publicFromClientHandler: MouseEventHandler = (
    _event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (channel === null) return;
    console.log('messageText', messageText);

    channel.publish('update-from-client', {
      text: `${messageText} @ ${new Date().toISOString()}`,
    });
  };

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
        <section className={styles.publish}>
          <h3>Publish</h3>
          <div>
            <label htmlFor="message">Message text</label>
            <input
              type="text"
              placeholder="message to publish"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>
          <div>
            <button onClick={publicFromClientHandler}>
              Publish from client
            </button>
          </div>
        </section>

        <section>
          <h3>Subscribe</h3>

          {/* {JSON.stringify(logs)}
          {JSON.stringify(channel?.basePath)} */}
          <Logger logEntries={logs} />
        </section>

        <Message message={message} setMessage={setMessage} />
      </div>
    </>
  );
}
