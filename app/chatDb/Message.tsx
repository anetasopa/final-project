// 'use client';

// import { useState } from 'react';
// import { BsSend } from 'react-icons/bs';
// import { SaveMessagesResponseBodyPost } from '../api/(auth)/messages/route';
// import styles from './Message.module.scss';

// export default function Message({
//   inputMessage,
//   setInputMessage,
//   userId,
//   receiverId,
// }) {
//   const [error, setError] = useState<string>('');

//   async function saveMessages(setError, error) {
//     const response = await fetch('/api/messages', {
//       method: 'POST',
//       body: JSON.stringify({
//         userId,
//         receiverId,
//         inputMessage,
//       }),
//     });

//     const data: SaveMessagesResponseBodyPost = await response.json();

//     if ('error' in data) {
//       setError(data.error);
//     }

//     if ('user' in data) {
//       setError('');
//     }
//   }

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
//         onChange={(e) => setInputMessage(e.target.value)}
//         id="search"
//         type={inputMessage}
//         placeholder="Message..."
//         required
//       />
//       <button
//         className={styles.messageButton}
//         onClick={async () => {
//           await saveMessages(setError, error);
//         }}
//       >
//         {/* Send */}
//         <BsSend className={styles.sendIcon} />
//       </button>
//     </form>
//   );
// }
