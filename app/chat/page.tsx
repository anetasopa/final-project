import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { FaPen } from 'react-icons/fa';
import { getUserBySessionToken, getUsersById } from '../../database/users';
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

  const singleUserData = getUsersById(userId);
  console.log({ singleUserData });
  return (
    <main className={styles.profileContainer}>
      <div className={styles.list}>
        <div className={styles.dataContainer}>
          <div className={styles.data}>
            <Image
              alt="userImage"
              src="/images/photo2.jpeg"
              width={50}
              height={50}
              className={styles.userImage}
            />
            <div className={styles.availability}></div>
            <p className={styles.name}>{user.username}</p>
          </div>
          <div className={styles.editIcon}>
            <FaPen />
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.chat}>Chat</div>
    </main>
  );
}
