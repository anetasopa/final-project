import Image from 'next/image';
import { User } from '../../migrations/1686751602-createTableUsers';
import { Contact } from '../../migrations/1687774485-createTableContacts';
import { Message } from '../../migrations/1687893283-createTableMessages';
import styles from './Chat.module.scss';

type Props = {
  messages: Message[];
  userId: number;
  receiverId: number;
  userContacts: Contact[];
  userData: User;
};

const renderMessage = (message, userId, userContacts, userData, receiverId) => {
  const receiverUser = userContacts.find(
    (contact) => contact.userId === receiverId,
  );
  const receiverImageUrl = receiverUser ? receiverUser.imageUrl : '';

  return message.creatorUserId === userId ? (
    <div className={styles.rightContainer}>
      <div>
        <Image
          alt="userImage"
          src={userData.imageUrl}
          width={50}
          height={50}
          className={styles.creatorImageUrl}
        />
      </div>
      <p className={styles.right}>{message.message}</p>
    </div>
  ) : (
    <div className={styles.leftContainer}>
      {receiverUser && (
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
  return (
    <div className={styles.messages}>
      {messages.map((message) =>
        renderMessage(message, userId, userContacts, userData, receiverId),
      )}
    </div>
  );
}
