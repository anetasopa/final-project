import Image from 'next/image';
import { User } from '../../database/users';
import { Messages } from '../../migrations/1687893283-createTableMessages';
import styles from './Chat.module.scss';

export class LogEntry {
  public timestamp: Date;
  public message: string;

  constructor(message: string) {
    this.timestamp = new Date();
    this.message = message;
  }
}

export type LoggingProps = {
  logEntries: Array<LogEntry>;
};

interface ChatProps {
  messages: Messages[];
  userId: string;
  receiverId: string | null;
  userContacts: User[];
  userData: any;
}

// const renderMessage = (message, userId, userContacts, userData, receiverId) => {
//   const receiverUser = userContacts.find(
//     (contact) => contact.userId === receiverId,
//   );
//   const receiverImageUrl = receiverUser ? receiverUser.imageUrl : '';

//   return message.creatorUserId === userId ? (
//     <div className={styles.rightContainer}>
//       <div>
//         <Image
//           alt="userImage"
//           src={userData.imageUrl}
//           width={50}
//           height={50}
//           className={styles.creatorImageUrl}
//         />
//       </div>
//       <p className={styles.right}>{message.message}</p>
//     </div>
//   ) : (
//     <div className={styles.leftContainer}>
//       {receiverUser && (
//         <Image
//           alt="userImage"
//           src={receiverImageUrl}
//           width={50}
//           height={50}
//           className={styles.receiverImageUrl}
//         />
//       )}
//       <p className={styles.left}>{message.message}</p>
//     </div>
//   );
// };

export default function Chat({
  logEntries,
}: // messages,
// userId,
// receiverId,
// userContacts,
// userData,
ChatProps) {
  return (
    <div className={styles.messages}>
      {/* {messages.map((message) =>
        renderMessage(message, userId, userContacts, userData, receiverId),
      )} */}
      {logEntries
        .sort((a: LogEntry, b: LogEntry) => {
          return b.timestamp.getTime() - a.timestamp.getTime();
        })
        .map((logEntry: LogEntry, index: number) => {
          return (
            <p className={styles.message} key={index}>
              {logEntry.timestamp.toISOString()}:{logEntry.message}
            </p>
          );
        })}
    </div>
  );
}
