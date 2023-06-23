import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React, { use } from 'react';
import { getCategories } from '../../../database/categories';
import {
  getUserBySessionToken,
  getUserCategories,
  getUsersById,
} from '../../../database/users';
import { Category } from '../../../migrations/1686916405-createTableCategories';
import styles from './page.module.scss';
import ProfileForm from './ProfileForm';

type Props = { params: { userName: string } };

export default async function Profile({ params }: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    notFound();
  }

  const userId = user.id;

  const singleUserData = await getUsersById(userId);
  const userCategories = await getUserCategories(userId);
  console.log(userCategories);

  if (!user) {
    notFound();
  }

  if (!singleUserData) {
    notFound();
  }

  const categories: Category[] = await getCategories();

  return (
    <main className={styles.profileContainer}>
      <div className={styles.background}></div>
      <div className={styles.info}>
        <div className={styles.dataUsernameContainer}>
          <ProfileForm
            singleUserData={singleUserData}
            userId={userId}
            categories={categories}
            userCategories={userCategories}
          />
        </div>
      </div>
    </main>
  );
}
