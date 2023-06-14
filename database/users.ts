import { cache } from 'react';
import { sql } from './connect';

type UserWithPasswordHash = {
  id: number;
  userName: string;
  passwordHash: string;
};

type User = {
  id: number;
  userName: string;
};

export const getUsers = cache(async () => {
  const users = await sql<UserWithPasswordHash[]>`
    SELECT * FROM users
 `;
  return [...users];
});
