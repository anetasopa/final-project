import { Sql } from 'postgres';

export type User = {
  id: number;
  firstName: string;
  passwordHash: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      firstName varchar(30) NOT NULL,
      passwordHash varchar(30) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
