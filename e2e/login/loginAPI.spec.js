import { pageTitle, pageURL } from '../../support/data/page'
import generalCommands from "../../support/generalCommands/general.commands"
import featureflagPage from "../../support/page_objects/featureflag/featureflag.page"

// @ts-check
const { test, expect } = require('@playwright/test');
const devFeatureFlags = JSON.parse(JSON.stringify(require("../../fixtures/feature_flags_dev.json")));

const featureFlagPage = "https://my-dev.phorest.com/a/18846/feature-flags";

test.beforeEach("Authentication", async ({ page }) => {
  await page.goto(process.env.DEV_BASE_URL);
  await expect(page).toHaveTitle(pageTitle.LOGIN);
  await expect(page.url()).toContain(pageURL.LOGIN)
})

test('Login without user interaction and turn on Feature Flags @login', async ({ page, request }) => {
  await generalCommands.loginAPI(page, request);
  await generalCommands.turnOnFeatureFlag(page, devFeatureFlags);
  await expect(page).toHaveTitle(pageTitle.APPOINTMENTS);
  await expect(page.url()).toContain(pageURL.APPOINTMENTS);
  await featureflagPage.navigatToFeatureFlagScreen(page);
  await page.waitForURL(featureFlagPage);
  await expect(page).toHaveTitle(pageTitle.FEATUREFLAG);
  await expect(page.url()).toContain(pageURL.FEATUREFLAG);
});