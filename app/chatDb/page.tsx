import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { getMessages } from '../../database/messages';
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

  const creatorUserId = 24;
  const receiverUserId = 32;

  const usersMessages = await getMessages(creatorUserId, receiverUserId);

  // const singleUserData = getUsersById(userId);

  return (
    <main className={styles.profileContainer}>
      <ChatForm
        userId={userId}
        userContacts={userContacts}
        userData={userData}
        usersMessages={usersMessages}
      />
    </main>
  );
}
