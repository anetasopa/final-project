import { cache } from 'react';
import { UserEntity } from '../migrations/1686751602-createTableUsers';
import { Category } from '../migrations/1686916405-createTableCategories';
import { sql } from './connect';

export type JsonAgg = [] | Category[];

export type UserWithPasswordHash = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
};

export type UserWithCategory = {
  id: number;
  username: string;
  email: string;
  nickname: string | null;
  imageUrl: string | null;
  description: string | null;
  categories: JsonAgg;
};

export type UserWithCategoryAndInterests = {
  id: number;
  userId: number;
  description: string | null;
  username: string;
  nickname: string | null;
  imageUrl: string | null;
  isContact: boolean;
  categories: JsonAgg;
  interests: JsonAgg;
};

export const unfollowUserById = cache(async (id: number) => {
  await sql`
    DELETE FROM
      contacts
    WHERE
      followed_user_id = ${id};
  `;
});

// export const getUsers = cache(async () => {
//   const users = await sql<[]>`
//     SELECT
//       u.id,
//       u.description,
//       u.username,
//       u.nickname,
//       u.image_url,
//       JSON_AGG(c.*) AS categories
//     FROM users u
//     LEFT JOIN user_categories uc ON u.id = uc.user_id
//     LEFT JOIN categories c ON c.id = uc.category_id
//     GROUP BY u.id
//     ;
//  `;

//   return users;
// });

export const getUsers2 = cache(async (skipUserId: number) => {
  const users = await sql<
    {
      id: number;
      userId: number;
      description: string | null;
      username: string;
      nickname: string | null;
      imageUrl: string | null;
      isContact: boolean;
      categories: JsonAgg;
      interests: JsonAgg;
    }[]
  >`
    SELECT
      u.id,
      u.id AS user_id,
      u.description,
      u.username,
      u.nickname,
      u.image_url,
      CASE WHEN con.id IS NULL THEN false ELSE true END is_contact,
      COALESCE(JSON_AGG(c.*) FILTER (WHERE c.id IS NOT NULL), '[]') AS categories,
      COALESCE(JSON_AGG(c.id)  FILTER (WHERE c.id IS NOT NULL), '[]') AS interests
    FROM users u
    LEFT JOIN user_categories uc ON u.id = uc.user_id
    LEFT JOIN categories c ON c.id = uc.category_id
    LEFT JOIN contacts con ON
      con.followed_user_id = u.id AND
      con.user_id = ${skipUserId} AND
      con.followed_user_id <> ${skipUserId}
    WHERE u.id != ${skipUserId}
    GROUP BY u.id, con.id
    ;
 `;

  return users;
});

export const getUsersWithPasswordHashByUserName = cache(
  async (username: string) => {
    const [user] = await sql<UserEntity[]>`
    SELECT * FROM users WHERE users.username = ${username}
 `;
    return user;
  },
);

export const getUsersById = cache(async (id: number) => {
  const [user] = await sql<
    {
      id: number;
      userId: number;
      username: string;
      email: string;
      nickname: string | null;
      imageUrl: string | null;
      description: string | null;
      categories: JsonAgg;
      interests: JsonAgg;
    }[]
  >`
    SELECT
      u.id,
      u.id AS user_id,
      u.username,
      u.email,
      u.nickname,
      u.image_url,
      u.description,
      COALESCE(JSON_AGG(c.*)  FILTER (WHERE c.id IS NOT NULL), '[]') AS categories,
      COALESCE(JSON_AGG(c.id)  FILTER (WHERE c.id IS NOT NULL), '[]') AS interests
    FROM
      users u
    LEFT JOIN user_categories uc ON u.id = uc.user_id
    LEFT JOIN categories c ON c.id = uc.category_id
    WHERE
      u.id = ${id}
    GROUP BY u.id
  `;
  return user;
});

export const getUserContacts = cache(async (id: number) => {
  const users = await sql<
    {
      userId: number | null;
      username: string | null;
      email: string | null;
      nickname: string | null;
      imageUrl: string | null;
      description: string | null;
      categories: JsonAgg;
    }[]
  >`
    SELECT
      u.id AS user_id,
      u.username,
      u.email,
      u.nickname,
      u.image_url,
      u.description,
      COALESCE(JSON_AGG(cat.*) FILTER (WHERE cat.id IS NOT NULL), '[]') AS categories
    FROM
      contacts c
    LEFT JOIN users AS u ON c.followed_user_id = u.id
    LEFT JOIN user_categories AS uc ON uc.user_id = u.id
    LEFT JOIN categories AS cat ON uc.category_id = cat.id
    WHERE
      c.user_id = ${id}
    GROUP BY u.id;
  `;
  return users;
});

export const updateUserContacts = cache(
  async (userId: number, followedUserId: number) => {
    await sql`
      INSERT INTO contacts
        (user_id, followed_user_id)
      VALUES
        (${userId}, ${followedUserId});
    `;
  },
);

export const getUsersByUserName = cache(async (username: string) => {
  const [user] = await sql<UserEntity[]>`
    SELECT * FROM users WHERE users.username = ${username}
 `;
  return user;
});

// export const getUserByToken = cache(async (token: string) => {
//   const [user] = await sql<User[]>
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
    const [user] = await sql<UserEntity[]>`
    INSERT INTO users (username, email, password_hash, image_url) VALUES(${username}, ${email}, ${passwordHash}, ${imageUrl}) RETURNING *
 `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<UserEntity[]>`
  SELECT
    u.*
  FROM
    users u
  INNER JOIN
    sessions s ON (
      s.token = ${token} AND
      s.user_id = u.id AND
      s.expiry_timestamp > now()
    )
  LIMIT 1
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
  async (userId: number, idSelectedCategories: number[]) => {
    await sql`
      DELETE FROM user_categories WHERE user_id = ${userId}
    `;

    for (const userCategory of idSelectedCategories) {
      await sql<{ id: number; userId: number; categoryId: number }[]>`
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
    const users = await sql<
      {
        id: number;
        username: string;
        email: string;
        passwordHash: string;
        nickname: string | null;
        imageUrl: string | null;
        description: string | null;
      }[]
    >`
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
  const userCategories = await sql<
    { id: number; value: string; label: string }[]
  >`
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
