import { pageTitle, pageURL } from '../../support/data/page'
import appointmentsPage from "../../support/page_objects/appointments/appointments.page"
import generalCommands from "../../support/generalCommands/general.commands"
import graphQLCommands from "../../support/generalCommands/graphQL.commands";
import {testClient} from "../../support/data/testData";

// @ts-check
const { test, expect } = require('@playwright/test');
const devFeatureFlags = JSON.parse(JSON.stringify(require("../../fixtures/feature_flags_dev.json")));

test.beforeEach("Authentication", async ({ page, request }) => {
    await page.goto(process.env.DEV_BASE_URL);
    await generalCommands.loginAPI(page, request);
    await generalCommands.turnOnFeatureFlag(page, devFeatureFlags);
    await graphQLCommands.createClient(page, request);
})

test('Appointment screen is available @smoke', async ({ page, request }) => {


    //await graphQLCommands.createAppointment(page, request, generalCommands.getClientID(page, request, testClient.FIRST_NAME));

});

test.afterEach('Delete appointment and the client with GraphQL @smoke', async ({ page, request }) => {

    // await graphQLCommands.deleteAppointment(
    //
    // );

    await graphQLCommands.deleteClient(
        page,
        request,
        await generalCommands.getClientID(page, request, testClient.FIRST_NAME
        ));

});
