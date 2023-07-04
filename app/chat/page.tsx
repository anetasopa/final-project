import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import {
  getUserBySessionToken,
  getUserContacts,
  getUsersById,
} from '../../database/users';
import ChatForm from './ChatForm';
import styles from './page.module.scss';

export default async function Chat() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    notFound();
  }

  const userId = user.id;

  const userContacts = await getUserContacts(userId);
  const userData = await getUsersById(userId);

  // const singleUserData = getUsersById(userId);

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  };

  return (
    <main className={styles.profileContainer}>
      <ChatForm
        userId={userId}
        userContacts={userContacts}
        firebaseConfig={firebaseConfig}
        userData={userData}
      />
    </main>
  );
}
