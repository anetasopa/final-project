import { cache } from 'react';
import { sql } from './connect';

export const saveMessages = cache(
  async (creatorUserId: number, content: string) => {
    await sql`
      INSERT INTO messages
        (creator_user_id, content)
      VALUES
        (${creatorUserId}, ${content})
        RETURNING *
    `;
  },
);
