import { cache } from 'react';
import {
  UserCategories,
  UserWithCategoriesInJsonAgg,
} from '../migrations/1687248585-createTableUserCategories';
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

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
    SELECT * FROM users
 `;

  return users;
});

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
      id,
      username,
      email,
      nickname,
      description
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
    await sql`
      UPDATE users
      SET
      nickname = ${nickname},
      description = ${description}
      WHERE
        id = ${id};

      -- DELETE FROM user_categories WHERE user_id = 30;
      -- INSERT INTO user_categories ;
    `;
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

export const getUsersWithCategories = cache(async (id: number) => {
  const userCategories = await sql<UserCategories[]>`
   SELECT
     users.id AS user_id,
     users.username AS user_username,
     users.email AS user_email,
     users.nickname AS user_email,
     users.description AS user_description,
     categories.id AS category_id,
     categories.name AS category_name,
     categories.label AS category_label
    FROM
     users
    INNER JOIN
      user_categories ON users.id = user_categories.user_id
    INNER JOIN
    categories ON categories.id = user_categories.category_id
    WHERE users.id = ${id}
  `;
  return userCategories;
});

// Join query for getting a single user with related categories using json_agg
export const getUserWithCategoriesById = cache(async (id: number) => {
  const [user] = await sql<UserWithCategoriesInJsonAgg[]>`
SELECT
  users.id AS user_id,
  users.username AS user_username,
  users.email AS user_email,
  users.nickname AS user_nickname,
  users.description AS user_description,
  (
    SELECT
      json_agg(categories.*)
    FROM
      user_categories
    INNER JOIN
    categories ON user_categories.category_id = categories.id
    WHERE
      user_categories.user_id = users.id

  ) AS user_categories
FROM
  users
WHERE
  users.id = ${id}
GROUP BY
users.id, users.username, users.email, users.nickname, users.description;
  `;

  return user;
});
