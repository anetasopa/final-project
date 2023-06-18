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

export const getUserByToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
  SELECT u.* FROM users u
  INNER JOIN sessions s ON u.id = s.user_id
  WHERE s.token = ${token}
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

sql`
SELECT u.* FROM sessions s
INNER JOIN users u ON u.id = s.user_id
WHERE s.token = 'OrEUqc6hs/Qp2jH6gDeglV83UfhV0ebOvcJUq+LSgwKxIYe3ENmTavqdUvboaIWhYSYEfZ0u28HWht+V//QX3yudh3O5VmTPkhixepMjenrXAeG6I1/GVPodqnr1arqIwT45HA==';
`;
