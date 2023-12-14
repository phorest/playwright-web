import { pageTitle, pageURL } from '../../support/data/page'
import clientsPage from "../../support/page_objects/clients/clients.page"
import generalCommands from "../../support/generalCommands/general.commands"

// @ts-check
const { test, expect } = require('@playwright/test');
const devFeatureFlags = JSON.parse(JSON.stringify(require("../../fixtures/feature_flags_dev.json")));

test.beforeEach("Authentication", async ({ page, request }) => {
    await page.goto(process.env.DEV_BASE_URL);
    await generalCommands.loginAPI(page, request);
    await generalCommands.turnOnFeatureFlag(page, devFeatureFlags);
})

test('Clients screen is available @smoke', async ({ page }) => {

    await clientsPage.navigatToClientsScreen(page);
    await expect(page).toHaveTitle(pageTitle.CLIENTS);
    await expect(page.url()).toContain(pageURL.CLIENTS);

});