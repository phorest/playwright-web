import generalCommands from "../support/generalCommands/general.commands"

// @ts-check
const { test } = require('@playwright/test');
const devFeatureFlags = JSON.parse(JSON.stringify(require("../fixtures/feature_flags_dev.json")));

let ffpage = "https://my-dev.phorest.com/a/18846/feature-flags";

test.beforeEach("Authentication", async ({ page, request }) => {
  await page.goto(process.env.DEV_BASE_URL);
  await generalCommands.login(page, request);
  await generalCommands.turnOnFeatureFlag(page, ffpage, devFeatureFlags);
})

test('Login with user interaction', async ({ page }) => {
  await page.waitForURL(ffpage);
});