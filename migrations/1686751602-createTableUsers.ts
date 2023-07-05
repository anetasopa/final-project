import { Sql } from 'postgres';
import { Category } from './1686916405-createTableCategories';
import { Contact } from './1687774485-createTableContacts';

export type User = {
  id: number;
  userId: number;
  username: string;
  email: string;
  password_hash: string;
  // account_id: number;
  nickname: string | null;
  imageUrl: string | null;
  description: string | null;
  contacts: Contact[];
  categories: Category[];
  interests: Category[];
};

export type UserEntity = {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  nickname: string | null;
  imageUrl: string | null;
  description: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id              integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username        varchar(30) NOT NULL,
      email           varchar(30) NOT NULL,
      password_hash   varchar(100) NOT NULL,
      -- account_id      integer,
      nickname        varchar(30) DEFAULT NULL,
      image_url       varchar(100) DEFAULT NULL,
      description     varchar(200) DEFAULT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
