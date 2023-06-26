import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import util from 'util';
import {
  getUserBySessionToken,
  getUsers2,
  getUsersById,
} from '../../database/users';
import styles from './page.module.scss';
import UsersList from './UsersList';

const usersWithSimilarInterests = (users, myUser) =>
  users.map((user) => {
    const commonInterests = user.interests.filter((interest) =>
      myUser.interests.includes(interest),
    );

    console.log(
      util.inspect(
        { user },

        { showHidden: false, depth: null, colors: true },
      ),
    );

    const commonCategories = user.categories.filter((category) => {
      // TypeError: Cannot read properties of undefined (reading 'map')
      // const categoryIds = myUser.categories.map((cat) => cat.id);

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

  //const categories = await getUserCategories(userId);
  const users = await getUsers2(userId);
  const myUser = await getUsersById(userId);

  const result = usersWithSimilarInterests(users, myUser);
  console.log({ result });

  console.log(
    util.inspect(
      {
        result,
      },

      { showHidden: false, depth: null, colors: true },
    ),
  );

  return (
    <main className={styles.listContainer}>
      <UsersList result={result} users={users} userId={userId} />
    </main>
  );
}
