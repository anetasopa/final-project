import util from 'node:util';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { getCategories } from '../../../database/categories';
import {
  getUserBySessionToken,
  getUserCategories,
  getUserContacts,
  getUsersById,
  UserWithCategory,
} from '../../../database/users';
import { Category } from '../../../migrations/1686916405-createTableCategories';
import styles from './page.module.scss';
import ProfileForm from './ProfileForm';

export default async function Profile() {
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
  // const userCategories = await getUserCategories(userId);

  if (!singleUserData) {
    notFound();
  }

  const { nickname, description, imageUrl, username } = singleUserData;
  const sanitizedUserData = {
    nickname: nickname ?? '',
    description: description ?? '',
    imageUrl: imageUrl ?? '',
    username: username,
  };

  type CategoryData = {
    id: number;
    value: string;
    label: string;
  };

  const userCategoriesRaw: CategoryData[] = await getUserCategories(userId);

  const userCategories: Category[] = userCategoriesRaw.map((categoryData) => ({
    id: categoryData.id,
    name: categoryData.value,
    label: categoryData.label,
  }));

  const userContacts: UserWithCategory[] = await getUserContacts(userId);
  const categories: Category[] = await getCategories();

  console.log(
    util.inspect(
      {
        userContacts,
      },

      { showHidden: false, depth: null, colors: true },
    ),
  );

  return (
    <main className={styles.profileContainer}>
      <div className={styles.background} />
      <div className={styles.info}>
        <div className={styles.dataUsernameContainer}>
          <ProfileForm
            singleUserData={sanitizedUserData}
            userId={userId}
            categories={categories}
            userCategories={userCategories}
            userContacts={userContacts}
          />
        </div>
      </div>
    </main>
  );
}
