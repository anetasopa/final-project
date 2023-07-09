import Image from 'next/image';
import { User } from '../../migrations/1686751602-createTableUsers';
import styles from './Chat.module.scss';
import { FirebaseMessage } from './ChatForm';
import {useEffect, useState} from "react";

type Props = {
  messages: FirebaseMessage[];
  userId: number;
  receiverId: number | null;
  userContacts: User[];
  userData: User;
};

type RenderMessageProps = {
  message: FirebaseMessage;
  userId: number;
  userContacts: User[];
  userData: User;
  receiverId: number | null;
};

const renderMessage = ({
  message,
  userId,
  userContacts,
  userData,
  receiverId,
}: RenderMessageProps) => {
  const receiverUser = userContacts.find(
    (contact) => contact.userId === receiverId,
  );

  const receiverImageUrl = receiverUser ? receiverUser.imageUrl : null;

  return message.creatorUserId === userId ? (
    <div className={styles.rightContainer}>
      <div>
        {userData.imageUrl ? (
          <Image
            alt="userImage"
            src={userData.imageUrl}
            width={50}
            height={50}
            className={styles.creatorImageUrl}
          />
        ) : null}
      </div>
      <p className={styles.right}>{message.message}</p>
    </div>
  ) : (
    <div className={styles.leftContainer}>
      {!!receiverImageUrl && (
        <Image
          alt="userImage"
          src={receiverImageUrl}
          width={50}
          height={50}
          className={styles.receiverImageUrl}
        />
      )}
      <p className={styles.left}>{message.message}</p>
    </div>
  );
};

export default function Chat({
  messages,
  userId,
  receiverId,
  userContacts,
  userData,
}: Props) {
  const [messagesEnd, setMessagesEnd] = useState();
  const scrollToBottom = () => {
    messagesEnd?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    console.log({messagesEnd})
    scrollToBottom();
  }, [messagesEnd, messages]);

  return (
    <div className={styles.messages}>
      {messages.map((message) =>
        renderMessage({ message, userId, userContacts, userData, receiverId }),
      )}
      <div style={{ float:"left", clear: "both" }}
           ref={(el) => { setMessagesEnd(el) }}>
      </div>
    </div>
  );
}
