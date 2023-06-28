import { cache } from 'react';
import { sql } from './connect';

export const saveMessages = cache(
  async (creatorUserId: number, receiverUserId: number) => {
    await sql`
      INSERT INTO messages
        (creator_user_id, receiver_user_id)
      VALUES
        (${creatorUserId}, ${receiverUserId});
    `;
  },
);
