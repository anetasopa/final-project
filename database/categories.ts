import { cache } from 'react';
import { Category } from '../migrations/1686916405-createTableCategories';
import { sql } from './connect';

export const getCategories = cache(async () => {
  const categories = await sql<Category[]>`
    SELECT * FROM categories
 `;
  return categories;
});

export const createCategory = cache(async (name: string, label: string) => {
  const [category] = await sql<Category[]>`
      INSERT INTO categories
        (name, label)
      VALUES
        (${name}, ${label})
      RETURNING *
    `;

  return category;
});
