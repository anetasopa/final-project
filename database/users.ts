import { cache } from 'react';
import { sql } from './connect';

export type UserWithPasswordHash = {
  id: number;
  userName: string;
  email: string;
  passwordHash: string;
};

export type User = {
  id: number;
  userName: string;
};

export const getUsersByUserName = cache(async (userName: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM users WHERE users.username = ${userName}
 `;
  return user;
});

export const createUser = cache(
  async (userName: string, email: string, passwordHash: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    INSERT INTO users (username, email, password_hash) VALUES(${userName}, ${email}, ${passwordHash}) RETURNING id, username
 `;
    return user;
  },
);
