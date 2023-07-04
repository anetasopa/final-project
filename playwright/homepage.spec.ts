import { expect, test } from '@playwright/test';

test('home page test', async ({ page }) => {
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
  await expect(page).toHaveURL('http://localhost:3000/profile/magdalena', {
    timeout: 10000,
  });

  // Click a edit button
  await page.getByRole('button', { name: 'Edit' }).click();

  // Fill profile form
  await page.getByTestId('profile-nickname').fill('Madzia');
  await page.getByTestId('profile-description').fill('Hi! I am Madzia.');
  await page.getByRole('main').locator('form').getByText('computer game');

  // Click a save button
  await page.getByRole('button', { name: 'Save' }).click();
});
