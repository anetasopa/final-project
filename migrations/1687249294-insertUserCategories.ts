// import { Sql } from 'postgres';

// const userCategories = [
//   { id: 1, userId: 1, categoryId: 2 },
//   { id: 2, userId: 2, categoryId: 1 },
//   { id: 3, userId: 1, categoryId: 3 },
//   { id: 4, userId: 3, categoryId: 4 },
// ];

// export async function up(sql: Sql) {
//   for (const userCategory of userCategories) {
//     await sql`
//     INSERT INTO user_categories
//       (user_id, category_id)
//     VALUES
//       (${userCategory.userId}, ${userCategory.categoryId})
//   `;
//   }
// }

// export async function down(sql: Sql) {
//   for (const userCategory of userCategories) {
//     await sql`
//       DELETE FROM user_categories WHERE id = ${userCategory.id}
//   `;
//   }
// }
