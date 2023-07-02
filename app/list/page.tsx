import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import util from 'util';
import { getMessages } from '../../database/messages';
import {
  getUserBySessionToken,
  getUsers2,
  getUsersById,
} from '../../database/users';
import styles from './page.module.scss';
import UsersList from './UsersList';

const usersWithSimilarInterests = (users: string, myUser: string) =>
  users.map((user) => {
    const commonInterests = user.interests.filter((interest) =>
      myUser.interests.includes(interest),
    );

    const commonCategories = user.categories.filter((category) => {
      const categoryIds = myUser.categories.map((category) => category.id);

      return categoryIds.includes(category.id);
    });

    const commonInterestsInPercentage = commonInterests.length
      ? (commonInterests.length / user.interests.length) * 100
      : 0;

    return {
      user,
      userId: user.userId,
      commonInterests: commonInterests,
      commonCategories: commonCategories,
      commonInterestsInPercentage: commonInterestsInPercentage,
    };
  });

export default async function List() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    notFound();
  }

  const userId = user.id;
  const users = await getUsers2(userId);
  const myUser = await getUsersById(userId);

  const result = usersWithSimilarInterests(users, myUser);

  console.log(
    util.inspect(
      {
        users,
        result,
      },

      { showHidden: false, depth: null, colors: true },
    ),
  );

  return (
    <main className={styles.listContainer}>
      <UsersList result={result} />
    </main>
  );
}
