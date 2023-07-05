import { Sql } from 'postgres';

export type Message = {
  id: number;
  content: string | null;
  timestamp: Date;
  creatorUserId: number | null;
  receiverUserId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE messages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content varchar(200) DEFAULT NULL,
      timestamp timestamp NOT NULL DEFAULT NOW(),
      creator_user_id integer DEFAULT NULL REFERENCES users (id),
      receiver_user_id integer DEFAULT NULL REFERENCES users (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE messages
  `;
}
