import clientPage from "../../support/page_objects/clients/clients.page"
import createClientPage from "../../support/page_objects/clients/createClient/createClients.page"
import generalCommands from "../../support/generalCommands/general.commands"
import graphQLCommands from "../../support/generalCommands/graphQL.commands";
import {testClient} from "../../support/data/testData";

// @ts-check
const { test } = require('@playwright/test');
const devFeatureFlags = JSON.parse(JSON.stringify(require("../../fixtures/feature_flags_dev.json")));

test.beforeEach("Authentication", async ({ page, request }) => {
    await page.goto(process.env.DEV_BASE_URL);
    await generalCommands.loginAPI(page, request);
    await generalCommands.turnOnFeatureFlag(page, devFeatureFlags);
})

test('Create a new client and delete it. @client', async ({ page }) => {

    await clientPage.navigateToClientsScreen(page);
    await createClientPage.clickOnAddClientButton(page);

    //Client Notes
    await createClientPage.fillNotes(page, testClient.NOTES);

    //Basic Information
    await createClientPage.fillFirstName(page, testClient.FIRST_NAME);
    await createClientPage.fillLastName(page, testClient.LAST_NAME);
    await createClientPage.pickGender(page, testClient.GENDER);
    await createClientPage.fillPhoneNumber(page, testClient.PHONE_NUMBER);
    await createClientPage.fillLandLine(page, testClient.LANDLINE);
    await createClientPage.fillEmail(page, testClient.EMAIL);
    await createClientPage.fillBirthDay(page, testClient.BIRTH_DAY);
    await createClientPage.pickBirthMonth(page, testClient.BIRTH_MONTH);
    await createClientPage.fillBirthYear(page, testClient.BIRTH_YEAR);

    //Client Settings
    await createClientPage.pickClientCategory(page, testClient.CLIENT_CATEGORY);
    await createClientPage.pickPreferredStaffMember(page, testClient.PREFERRED_STAFF_MEMBER);
    await createClientPage.pickWhereDidTheyHereFromUS(page, testClient.WHERE_DID_THEY_HERE_FROM_US);
    await createClientPage.pickReferredBy(page, testClient.REFERRED_BY);
    await createClientPage.fillClientID(page, testClient.CLIENT_ID);

    //Notifications
    await createClientPage.marketingPermissionCheckboxByEmailIsChecked(page, false);
    await createClientPage.setPermissionCheckboxByEmail(page, testClient.MARKETING_PERMISSION_BY_EMAIL);
    await createClientPage.marketingPermissionCheckboxByEmailIsChecked(page, true);

    await createClientPage.marketingPermissionCheckboxBySMSIsChecked(page, false);
    await createClientPage.setPermissionCheckboxBySMS(page, testClient.MARKETING_PERMISSION_BY_SMS);
    await createClientPage.marketingPermissionCheckboxBySMSIsChecked(page, true);

    await createClientPage.appointmentReminderCheckboxByEmailIsChecked(page, true);
    await createClientPage.setAppointmentReminderCheckboxByEmail(page, testClient.APPOINTMENT_REMINDER_BY_EMAIL);
    await createClientPage.appointmentReminderCheckboxByEmailIsChecked(page, true);

    await createClientPage.appointmentReminderCheckboxBySMSIsChecked(page, true);
    await createClientPage.setAppointmentReminderCheckboxBySMS(page, testClient.APPOINTMENT_REMINDER_BY_SMS);
    await createClientPage.appointmentReminderCheckboxBySMSIsChecked(page, true);

    //Prompts
    await createClientPage.promptOnClientNotesIsChecked(page, false);
    await createClientPage.setPromptOnClientNotes(page, testClient.PROMPT_ON_CLIENT_NOTES);
    await createClientPage.promptOnClientNotesIsChecked(page, true);

    await createClientPage.promptOnAppointmentNotesIsChecked(page, false);
    await createClientPage.setPromptOnAppointmentNotes(page, testClient.PROMPT_ON_APPOINTMENT_NOTES);
    await createClientPage.promptOnAppointmentNotesIsChecked(page, true);

    //Address information
    await createClientPage.fillAddressLineOne(page, testClient.ADDRESS_LINE_1);
    await createClientPage.fillAddressLineTwo(page, testClient.ADDRESS_LINE_2);
    await createClientPage.fillTownCity(page, testClient.TOWN_CITY);
    await createClientPage.fillCountyStateRegion(page, testClient.COUNTRY_STATE_REGION);
    await createClientPage.fillZipPostcode(page, testClient.ZIP_POSTCODE);
    await createClientPage.pickCountry(page, testClient.COUNTRY);

    await createClientPage.clickOnSaveButton(page);

});

test.afterEach('Delete a client with GraphQL @smoke', async ({ page, request }) => {

    const clientId = await graphQLCommands.getClientId(page, request, testClient.FIRST_NAME);
    await graphQLCommands.deleteClient(page, request, clientId);

});
