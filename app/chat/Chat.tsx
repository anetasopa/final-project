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

const renderMessage = (message, userId) => {
  return message.creatorUserId === userId ? (
    <div className={styles.rightContainer}>
      <p className={styles.right}>{message.message}</p>
    </div>
  ) : (
    <div>
      <p className={styles.left}>{message.message}</p>
    </div>
  );
};

export default function Chat({
  // logEntries,
  messages,
  userId,
  receiverId,
}): Props {
  return (
    <div className={styles.messages}>
      {messages.map((message) => renderMessage(message, userId))}
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
