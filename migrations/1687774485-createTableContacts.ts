import { Sql } from 'postgres';

export type Contacts = {
  id: number;
  userId: number;
  followedUserId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE contacts (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      followed_user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE contacts
  `;
}
