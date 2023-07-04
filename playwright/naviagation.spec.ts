import { expect, test } from '@playwright/test';

test('chat test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page).toHaveURL('http://localhost:3000/register');

  // Check register form
  await page.getByTestId('register-user-name').fill('magdalena');
  await page.getByTestId('register-email').fill('magdalena@gmail.com');
  await page.getByTestId('register-email').fill('magdalena');

  // Expect a signup button
  await page.getByRole('button', { name: 'Sign Up' }).click();

  // Click a login button
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Check login form
  await page.getByTestId('register-user-name').fill('magdalena');
  await page.getByTestId('register-email').fill('magdalena@gmail.com');
  await page.getByTestId('register-email').fill('magdalena');
});
