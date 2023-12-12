import loginCommands from "../support/page_objects/login.commands"
import generalCommands from "../support/generalCommands/general.commands"

// @ts-check
const { test } = require('@playwright/test');

test.beforeEach("Authentication", async ({ page }) => {
  await page.goto(process.env.DEV_BASE_URL);
})

test('Login with user interaction', async ({ page }) => {
  await loginCommands.login(page, process.env.TESTUSER_USERNAME, process.env.TESTUSER_PASSWORD);
  await page.getByRole('button', { name: 'Sign out' }).isVisible();
});