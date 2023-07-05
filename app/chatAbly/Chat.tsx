// import styles from './Chat.module.scss';

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

// export default function Chat({ logEntries }: LoggingProps) {
//   return (
//     <div className={styles.messages}>
//       {logEntries
//         .sort((a: LogEntry, b: LogEntry) => {
//           return b.timestamp.getTime() - a.timestamp.getTime();
//         })
//         .map((logEntry: LogEntry, index: number) => {
//           return (
//             <p className={styles.message} key={index}>
//               {logEntry.timestamp.toISOString()}:{logEntry.message}
//             </p>
//           );
//         })}
//     </div>
//   );
// }
