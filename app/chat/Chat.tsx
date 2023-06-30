import Image from 'next/image';
import styles from './Chat.module.scss';

// export class LogEntry {
//   public timestamp: Date;
//   public message: string;

//   constructor(message: string) {
//     this.timestamp = new Date();
//     this.message = message;
//   }
// }

// export type LoggingProps = {
//   logEntries: Array<LogEntry>;
// };

const renderMessage = (message, userId, userContacts, user, receiverId) => {
  const receiverUser = userContacts.find(
    (contact) => contact.userId === receiverId,
  );
  const imageUrl = receiverUser ? receiverUser.imageUrl : '';

  return message.creatorUserId === userId ? (
    <div className={styles.rightContainer}>
      <p className={styles.right}>{message.message}</p>
    </div>
  ) : (
    <div className={styles.leftContainer}>
      {receiverUser && (
        <Image
          alt="userImage"
          src={imageUrl}
          width={50}
          height={50}
          className={styles.userImage}
        />
      )}
      <p className={styles.left}>{message.message}</p>
    </div>
  );
};

export default function Chat({
  // logEntries,
  messages,
  userId,
  receiverId,
  userContacts,
  user,
}): Props {
  return (
    <div className={styles.messages}>
      {messages.map((message) =>
        renderMessage(message, userId, userContacts, user, receiverId),
      )}
      {/* {logEntries
        .sort((a: LogEntry, b: LogEntry) => {
          return b.timestamp.getTime() - a.timestamp.getTime();
        })
        .map((logEntry: LogEntry, index: number) => {
          return (
            <p className={styles.message} key={index}> */}
      {/* {logEntry.timestamp.toISOString()}:  */}
      {/* {logEntry.message}
            </p>
          );
        })} */}
    </div>
  );
}
