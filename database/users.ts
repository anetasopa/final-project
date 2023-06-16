import { cache } from 'react';
import { sql } from './connect';

export type UserWithPasswordHash = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
};

export const getUsersWithPasswordHashByUserName = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM users WHERE users.username = ${username}
 `;
    return user;
  },
);

// export const getUsersById = cache(async (id: number) => {
//   const [user] = await sql<User[]>`
//     SELECT id, username FROM users WHERE users.id = ${id}
//  `;
//   return user;
// });

export const getUsersByUserName = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT id, username FROM users WHERE users.username = ${username}
 `;
  return user;
});

export const createUser = cache(
  async (username: string, email: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
    INSERT INTO users (username, email, password_hash) VALUES(${username}, ${email}, ${passwordHash}) RETURNING id, username
 `;
    return user;
  },
);
