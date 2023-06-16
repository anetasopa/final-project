import { Sql } from 'postgres';

export const categories = [
  {
    id: 1,
    name: 'running',
    label: 'Running',
  },
  {
    id: 2,
    name: 'computer game',
    label: 'Computer game',
  },
  {
    id: 3,
    name: 'trip',
    label: 'Trip',
  },
  {
    id: 4,
    name: 'programming',
    label: 'Programming',
  },
  {
    id: 5,
    name: 'football',
    label: 'Football',
  },
  {
    id: 6,
    name: 'nature',
    label: 'Nature',
  },
  {
    id: 7,
    name: 'travel',
    label: 'Travel',
  },
];

export async function up(sql: Sql) {
  for (const category of categories) {
    await sql`
    INSERT INTO categories
      (name, label)
    VALUES
      (${category.name}, ${category.label})
  `;
  }
}

export async function down(sql: Sql) {
  for (const category of categories) {
    await sql`
      DELETE FROM categories WHERE id = ${category.id}
  `;
  }
}
