import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { getUserBySessionToken, getUsersById } from '../../database/users';
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

  // const singleUserData = getUsersById(userId);

  return (
    <main className={styles.profileContainer}>
      <ChatForm user={user} />
    </main>
  );
}
