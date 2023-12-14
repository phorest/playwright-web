import loginPage from "../../support/page_objects/login.page"
import generalCommands from "../../support/generalCommands/general.commands"
import { pageTitle, pageURL } from '../../support/data/page'

// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach("Authentication", async ({ page }) => {
  await page.goto(process.env.DEV_BASE_URL);
  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
})

test('Login with user interaction and I can not log out by clicking on the back button @login', async ({ page }) => {
  await loginPage.login(page, process.env.TESTUSER_USERNAME, process.env.TESTUSER_PASSWORD);
  await expect(page).toHaveTitle(pageTitle.APPOINTMENTS);
  await expect(page.url()).toContain(pageURL.APPOINTMENTS);
  await page.goBack();
  await expect(page).toHaveTitle(pageTitle.APPOINTMENTS);
  await expect(page.url()).toContain(pageURL.APPOINTMENTS);
});

test('As a user, I should be able to successfully logout @login', async ({ page, request }) => {
  await generalCommands.loginAPI(page, request);
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
});
