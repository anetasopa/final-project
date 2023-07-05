import { cache } from 'react';
import { Message } from '../migrations/1687893283-createTableMessages';
import { sql } from './connect';

export const getMessages = cache(
  async (creatorUserId: number, receiverUserId: number) => {
    const messages = await sql<Message[]>`
      SELECT
        id,
        content,
        timestamp,
        creator_user_id,
        receiver_user_id
      FROM messages
      WHERE
        (creator_user_id = ${creatorUserId} AND receiver_user_id = ${receiverUserId}) OR
        (creator_user_id = ${receiverUserId} AND receiver_user_id = ${creatorUserId})
    `;

    return messages;
  },
);

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
