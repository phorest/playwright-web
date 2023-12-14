import loginPage from "../../support/page_objects/login.page"
import { pageTitle, pageURL } from '../../support/data/page'
import { loginPageErrorMessage } from '../../support/data/error_messages'

// @ts-check
const { test, expect } = require('@playwright/test');
const wrongtestusername = "wrongtestusername@test.com";
const wrongTestPassword = "wrongTestPassword";

test.beforeEach("Authentication", async ({ page }) => {
  await page.goto(process.env.DEV_BASE_URL);
})

test('As a user, I should not be able to login with an invalid username and password @login', async ({ page }) => {
  await loginPage.login(page, wrongtestusername, wrongTestPassword);

  await page.getByText(loginPageErrorMessage.INVALID_CREDENTIALS).isVisible();

  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
});

test('As a user, I should not be able to login with a valid email and invalid password @login', async ({ page }) => {
  await loginPage.login(page, process.env.TESTUSER_USERNAME, wrongTestPassword);

  await page.getByText(loginPageErrorMessage.INVALID_CREDENTIALS).isVisible();

  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
});

test('As a user, I should not be able to login with an invalid email an valid password @login', async ({ page }) => {
  await loginPage.login(page, wrongtestusername, process.env.TESTUSER_PASSWORD);

  await page.getByText(loginPageErrorMessage.INVALID_CREDENTIALS).isVisible();

  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
});

test('As a user, I should not be able to login with a badly formatted email address @login', async ({ page }) => {
  await loginPage.login(page, "invalid@.com", process.env.TESTUSER_PASSWORD);

  await page.getByText(loginPageErrorMessage.INVALID_EMAIL).isVisible();

  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
});

test('As a user, I should not be able to enter into the system by clicking on the browser back button after successful logout @login', async ({ page }) => {
  await loginPage.login(page, process.env.TESTUSER_USERNAME, process.env.TESTUSER_PASSWORD);
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.goBack();
  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
});

test('As a user, I should not be able to login with a blank password field @login', async ({ page }) => {
  await loginPage.login(page, process.env.TESTUSER_USERNAME, "");
  await page.getByText(loginPageErrorMessage.REQUIRED).isVisible();
  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
});

test('As a user, I should not be able to login with a blank email field @login', async ({ page }) => {
  await loginPage.login(page, "", process.env.TESTUSER_PASSWORD);
  await page.getByText(loginPageErrorMessage.REQUIRED).isVisible();
  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
});

test('As a user, I should not be able to login with blank username and password fields @login', async ({ page }) => {
  await loginPage.login(page, "", "");
  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN);
});