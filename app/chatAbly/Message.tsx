// 'use client';

// import styles from './Message.module.scss';

// export default function Message({
//   messages,
//   messageText,
//   setMessageText,
//   publicFromClientHandler,
// }) {
//   // const app = initializeApp(firebaseConfig);
//   // const db = getDatabase();
//   return (
//     <form
//       className={styles.messageForm}
//       onSubmit={(event) => event.preventDefault()}
//       role="search"
//     >
//       <label className={styles.messageLabel} htmlFor="search">
//         Search for stuff
//       </label>
//       <input
//         className={styles.messageInput}
//         onChange={(e) => setMessageText(e.target.value)}
//         id="search"
//         type={messageText}
//         placeholder="Message..."
//         required
//       />

//       <p className={styles.message}>
//         {' '}
//         {messages.map((m: any) => (
//           <p key={`message-${m}`}>{m.message}</p>
//         ))}
//       </p>
//     </form>
//   );
// }
