import { Sql } from 'postgres';

export type Category = {
  id: number;
  name: string;
  label: string;
};

export type UserCategories = {
  userId: number;
  userUsername: string;
  userEmail: string;
  userNickname: string;
  userDescription: string;
  categoryId: number;
  categoryName: string;
  categoryLabel: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE user_categories (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      category_id integer NOT NULL REFERENCES categories (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE user_categories
  `;
}
