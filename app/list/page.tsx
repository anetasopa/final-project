import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import React from 'react';
import { getCategories } from '../../database/categories';
import {
  getUserBySessionToken,
  getUserCategories,
  getUsers,
  getUsersById,
} from '../../database/users';
import { Category } from '../../migrations/1686916405-createTableCategories';
import styles from './page.module.scss';
import UsersList from './UsersList';

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

  const users = await getUsers();
  console.log({ users });

  return (
    <main className={styles.listContainer}>
      <h2>List of users</h2>
      <UsersList users={users} />
    </main>
  );
}