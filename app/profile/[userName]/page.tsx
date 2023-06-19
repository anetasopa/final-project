import { cookies } from 'next/headers';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import { getCategories } from '../../../database/categories';
import { getUserBySessionToken } from '../../../database/users';
import { Category } from '../../../migrations/1686916405-createTableCategories';
import styles from './page.module.scss';
import ProfileForm from './ProfileForm';

type Props = { params: { userName: string } };

export default async function Profile({ params }: Props) {
  // const cookieStore = cookies();
  // const token = cookieStore.get('sessionToken');
  // const tokenValue = token?.value;
  // if (!tokenValue) {
  //   notFound();
  // }

  // const user = await getUserByToken(tokenValue);
  // console.log({ user });

  // if (!user) {
  //   notFound();
  // }

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    notFound();
  }

  const categories: Category[] = await getCategories();

  return (
    <main className={styles.profileContainer}>
      <div className={styles.background}></div>
      <div className={styles.info}>
        <div>
          <Image
            alt="userImage"
            src="/images/photo2.jpeg"
            width={300}
            height={300}
            className={styles.userImage}
          />
          <p className={styles.name}>{user.username}</p>
        </div>
        <div>
          <div>
            <ProfileForm categories={categories} />
          </div>
        </div>
      </div>
    </main>
  );
}
