import { cache } from 'react';
import { Messages } from '../migrations/1687893283-createTableMessages';
import { sql } from './connect';

export const getMessages = cache(async () => {
  const messages = await sql<Messages[]>`
    SELECT * FROM messages
 `;
  return messages;
});

export const saveMessages = cache(
  async (inputMessage: string, userId: number, receiverId: number) => {
    await sql`
      INSERT INTO messages
        (content, creator_user_id, receiver_user_id)
      VALUES
        (${inputMessage}, ${userId}, ${receiverId})
        RETURNING *
    `;
  },
);
