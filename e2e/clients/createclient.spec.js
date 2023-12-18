import clientsPage from "../../support/page_objects/clients/clients.page"
import generalCommands from "../../support/generalCommands/general.commands"

// @ts-check
const { test } = require('@playwright/test');
const devFeatureFlags = JSON.parse(JSON.stringify(require("../../fixtures/feature_flags_dev.json")));

const testClient = {
    NOTES: 'Test Notes',
    FIRST_NAME: 'Istvan',
    LAST_NAME: 'Gercsak',
    GENDER: 'Male',
    PHONE_NUMBER: '1231234567',
    LANDLINE: '1231234567',
    EMAIL: 'test@test.com',
    BIRTH_YEAR: '1988',
    BIRTH_MONTH: 'December',
    BIRTH_DAY: '30',
    MARKETING_PERMISSION_BY_EMAIL: true,
    MARKETING_PERMISSION_BY_SMS: true,
    APPOINTMENT_REMINDER_BY_EMAIL: true,
    APPOINTMENT_REMINDER_BY_SMS: true,
    CLIENT_CATEGORY: '',
    PREFERRED_STAFF_MEMBER: '',
    WHERE_DID_THEY_HERE_FROM_US: 'Google',
    REFERRRED_BY: '',
    CLIENT_ID: '',
    PROMPT_ON_CLIENT_NOTES: true,
    PROMPT_ON_APPOINTMENT_NOTES: true,
    ADDRESS_LINE_1: 'ADDRESS_LINE_1',
    ADDRESS_LINE_2: 'ADDRESS_LINE_2',
    TOWN_CITY: "TOWN_CITY",
    COUNTRY_STATE_REGION: "COUNTRY_STATE_REGION",
    ZIP_POSTCODE: "ZIP_POSTCODE",
    COUNTRY: "Ireland"
}

test.beforeEach("Authentication", async ({ page, request }) => {
    await page.goto(process.env.DEV_BASE_URL);
    await generalCommands.loginAPI(page, request);
    await generalCommands.turnOnFeatureFlag(page, devFeatureFlags);
})

test('Create a new client @client', async ({ page }) => {

    await clientsPage.navigateToClientsScreen(page);
    await clientsPage.clickOnAddClientButton(page);

    //Client Notes
    await clientsPage.fillNotes(page, testClient.NOTES);

    //Basic Information
    await clientsPage.fillFirstName(page, testClient.FIRST_NAME);
    await clientsPage.fillLastName(page, testClient.LAST_NAME);
    await clientsPage.pickGender(page, testClient.GENDER);
    await clientsPage.fillPhoneNumber(page, testClient.PHONE_NUMBER);
    await clientsPage.fillLandLine(page, testClient.LANDLINE);
    await clientsPage.fillEmail(page, testClient.EMAIL);
    await clientsPage.fillBirthDay(page, testClient.BIRTH_DAY);
    await clientsPage.pickBirthMonth(page, testClient.BIRTH_MONTH);
    await clientsPage.fillBirthYear(page, testClient.BIRTH_YEAR);

    //Client Settings
    await clientsPage.pickClientCategory(page, testClient.CLIENT_CATEGORY);
    await clientsPage.pickPreferredStaffMember(page, testClient.PREFERRED_STAFF_MEMBER);
    await clientsPage.pickWhereDidTheyHereFromUS(page, testClient.WHERE_DID_THEY_HERE_FROM_US);
    await clientsPage.pickReferredBy(page, testClient.REFERRRED_BY);
    await clientsPage.fillClientID(page, testClient.CLIENT_ID);

    //Notifications
    await clientsPage.marketingPermissionCheckboxByEmailIsChecked(page, false);
    await clientsPage.setPermissionCheckboxByEmail(page, testClient.MARKETING_PERMISSION_BY_EMAIL);
    await clientsPage.marketingPermissionCheckboxByEmailIsChecked(page, true);

    await clientsPage.marketingPermissionCheckboxBySMSIsChecked(page, false);
    await clientsPage.setPermissionCheckboxBySMS(page, testClient.MARKETING_PERMISSION_BY_SMS);
    await clientsPage.marketingPermissionCheckboxBySMSIsChecked(page, true);

    await clientsPage.appointmentReminderCheckboxByEmailIsChecked(page, true);
    await clientsPage.setAppointmentReminderCheckboxByEmail(page, testClient.APPOINTMENT_REMINDER_BY_EMAIL);
    await clientsPage.appointmentReminderCheckboxByEmailIsChecked(page, true);

    await clientsPage.appointmentReminderCheckboxBySMSIsChecked(page, true);
    await clientsPage.setAppointmentReminderCheckboxBySMS(page, testClient.APPOINTMENT_REMINDER_BY_SMS);
    await clientsPage.appointmentReminderCheckboxBySMSIsChecked(page, true);

    //Prompts
    await clientsPage.promptOnClientNotesIsChecked(page, false);
    await clientsPage.setPromptOnClientNotes(page, testClient.PROMPT_ON_CLIENT_NOTES);
    await clientsPage.promptOnClientNotesIsChecked(page, true);

    await clientsPage.promptOnAppointmentNotesIsChecked(page, false);
    await clientsPage.setPromptOnAppointmentNotes(page, testClient.PROMPT_ON_APPOINTMENT_NOTES);
    await clientsPage.promptOnAppointmentNotesIsChecked(page, true);

    //Address information
    await clientsPage.fillAddressLineOne(page, testClient.ADDRESS_LINE_1);
    await clientsPage.fillAddressLineTwo(page, testClient.ADDRESS_LINE_2);
    await clientsPage.fillTownCity(page, testClient.TOWN_CITY);
    await clientsPage.fillCountyStateRegion(page, testClient.COUNTRY_STATE_REGION);
    await clientsPage.fillZipPostcode(page, testClient.ZIP_POSTCODE);
    await clientsPage.pickCountry(page, testClient.COUNTRY);

    //await clientsPage.clickOnSaveButton(page);

});
