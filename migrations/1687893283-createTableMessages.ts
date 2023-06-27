import { Sql } from 'postgres';

export type Messages = {
  id: number;
  content: string;
  timestamp: Date;
  creator_user_id: number;
  receiver_user_id: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE messages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content varchar(200) NOT NULL,
      timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      creator_user_id integer NOT NULL REFERENCES users (id),
      receiver_user_id integer NOT NULL REFERENCES users (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE messages
  `;
}
