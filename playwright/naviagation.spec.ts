import { expect, test } from '@playwright/test';

test('chat test', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page).toHaveURL('http://localhost:3000/register');

  // // Check register form
  // await page.getByTestId('checkout-first-name').fill('first name');
});
