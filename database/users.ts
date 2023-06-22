import { cache } from 'react';
import { UserCategories } from '../migrations/1687248585-createTableUserCategories';
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
  imageUrl: string | null;
  description: string | null;
};

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      u.id,
      u.description,
      u.username,
      u.nickname,
      u.image_url,
      JSON_AGG(c.*) AS categories
    FROM users u
    LEFT JOIN user_categories uc ON u.id = uc.user_id
    LEFT JOIN categories c ON c.id = uc.category_id
    GROUP BY u.id
    ;

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
      image_url,
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
  async (
    username: string,
    email: string,
    passwordHash: string,
    imageUrl: string,
  ) => {
    const [user] = await sql<User[]>`
    INSERT INTO users (username, email, password_hash, image_url) VALUES(${username}, ${email}, ${passwordHash}, ${imageUrl}) RETURNING id, username
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
    //  PostgresError: syntax error at or near "description"
    await sql`
      UPDATE users
      SET
      nickname = ${nickname},
      description = ${description}
      WHERE
        id = ${id};
    `;
  },
);

export const updateUserImageById = cache(
  async (id: number, imageUrl: string) => {
    await sql`
      UPDATE users
      SET
      image_url = ${imageUrl}
      WHERE
        id = ${id};
    `;
  },
);

export const updateCategoriesOfUserById = cache(
  async (userId: number, idSelectedCategories: any[]) => {
    await sql`
      DELETE FROM user_categories WHERE user_id = ${userId}
    `;

    for (const userCategory of idSelectedCategories) {
      await sql`
      INSERT INTO user_categories
        (user_id, category_id)
      VALUES
        (${userId}, ${userCategory})
        RETURNING
        id,
        user_id,
        category_id
    `;
    }
  },
);

export const getUsersWithLimitAndOffsetBySessionToken = cache(
  async (limit: number, offset: number, token: string) => {
    const users = await sql<User[]>`
      SELECT
        users.*
      FROM
      users
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.expiry_timestamp > now()
        )
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return users;
  },
);

export const getUserCategories = cache(async (userId: number) => {
  const userCategories = await sql<UserCategories[]>`
    SELECT
      c.id,
      c.name AS value,
      c.name AS label
    FROM
      categories c
    INNER JOIN
      user_categories uc ON c.id = uc.category_id
    WHERE uc.user_id = ${userId}
  `;

  return userCategories;
});
