import clientsPage from "../../support/page_objects/clients/clients.page"
import generalCommands from "../../support/generalCommands/general.commands"
import graphQLCommands from "../../support/generalCommands/graphQL.commands";
import { testClient } from "../../support/data/testData";
// @ts-check
const { test } = require('@playwright/test');
const devFeatureFlags = JSON.parse(JSON.stringify(require("../../fixtures/feature_flags_dev.json")));

test.beforeEach("Authentication", async ({ page, request }) => {
    await page.goto(process.env.DEV_BASE_URL);
    await generalCommands.loginAPI(page, request);
    await generalCommands.turnOnFeatureFlag(page, devFeatureFlags);
    await graphQLCommands.createClient(page, request);
})

test('Create a new client and delete it. @client', async ({ page }) => {

    await page.goto(process.env.DEV_BASE_URL);
    await clientsPage.navigateToClientsScreen(page);

    await clientsPage.fillFirstNameSearchField(page, testClient.FIRST_NAME);
    await clientsPage.clickOnFirstFinding(page, testClient.FIRST_NAME);

});


test.afterEach('Delete a client with GraphQL @smoke', async ({ page, request }) => {

    const clientId = await graphQLCommands.getClientId(page, request, testClient.FIRST_NAME);
    await graphQLCommands.deleteClient(page, request, clientId);

});
