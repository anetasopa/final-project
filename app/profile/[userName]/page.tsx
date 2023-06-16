import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { getUsersByUserName } from '../../../database/users';
import styles from './page.module.scss';
import ProfileForm from './ProfileForm';

type Props = { params: { userName: string } };

export default async function Profile({ params }: Props) {
  const user = await getUsersByUserName(params.userName);

  if (!user) {
    notFound();
  }
  return (
    <main className={styles.profileContainer}>
      <div className={styles.background}></div>
      <div className={styles.info}>
        <Image
          alt="userImage"
          src="/images/photo2.jpeg"
          width={300}
          height={300}
          className={styles.userImage}
        />
        <div>
          <div></div>
          <div>
            <ProfileForm />
          </div>
        </div>
        <p className={styles.p}>{user.userName}</p>
      </div>
    </main>
  );
}
