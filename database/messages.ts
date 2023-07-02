import { cache } from 'react';
import { sql } from './connect';

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
