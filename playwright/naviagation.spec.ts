import { expect, test } from '@playwright/test';

test('homepage test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page).toHaveURL('http://localhost:3000/register');

  // Check register form
  await page.getByTestId('register-username').fill('magdalena');
  await page.getByTestId('register-email').fill('magdalena@gmail.com');
  await page.getByTestId('register-password').fill('magdalena');

  // Expect a signup button
  // await page.getByRole('button', { name: 'Sign Up' }).click();

  // Click a login button
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Check login form
  await page.getByTestId('login-username').fill('magdalena');
  await page.getByTestId('login-password').fill('magdalena');

  // Click a login button
  await page.getByRole('button', { name: 'Log In' }).click();
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  await expect(page).toHaveURL('http://localhost:3000/profile/magdalena', {
    timeout: 5000,
  });
});
