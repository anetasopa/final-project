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
  nickname: string | null;
  // image_url: string | null;
  description: string | null;
};

export const getUsersWithPasswordHashByUserName = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM users WHERE users.username = ${username}
 `;
    return user;
  },
);

export const getUsersById = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
    users
    WHERE
      id = ${id}
  `;
  return user;
});

export const getUsersByUserName = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT id, username FROM users WHERE users.username = ${username}
 `;
  return user;
});

// export const getUserByToken = cache(async (token: string) => {
//   const [user] = await sql<User[]>`
//   SELECT u.* FROM users u
//   INNER JOIN sessions s ON u.id = s.user_id
//   WHERE s.token = ${token}
//  `;
//   return user;
// });

export const createUser = cache(
  async (username: string, email: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
    INSERT INTO users (username, email, password_hash) VALUES(${username}, ${email}, ${passwordHash}) RETURNING id, username
 `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.username
  FROM
    users
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
    )
  `;

  return user;
});

// export const updateUserByUserName = cache(
//   async (nickname: string, description: string) => {
//     const [user] = await sql<User[]>`
//     INSERT INTO users (nickname, description) VALUES(${nickname}, ${description}) RETURNING id, username
//  `;
//     return user;
//   },
// );

export const updateUserById = cache(
  async (id: number, nickname: string, description: string) => {
    const [user] = await sql<User[]>`
      UPDATE users
      SET
      nickname = ${nickname},
      description = ${description}
      WHERE
        id = ${id}
        RETURNING *
    `;

    return user;
  },
);

export const getUsersWithLimitAndOffsetBySessionToken = cache(
  async (limit: number, offset: number, token: string) => {
    const animals = await sql<User[]>`
      SELECT
        users.*
      FROM
      users
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.expiry_timestamp > now()
          -- sessions.user_id = animals.user_id
        )
      -- This would JOIN the users table that is related to animals
      -- INNER JOIN
      --   users ON (
      --     users.id = animals.user_id AND
      --     sessions.user_id = users.id
      --   )
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return animals;
  },
);
