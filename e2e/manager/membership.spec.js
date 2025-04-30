import managerPage from "../../support/page_objects/manager/manager.page"
import membershipPage from "../../support/page_objects/manager/membership/membership.page"
import generalCommands from "../../support/generalCommands/general.commands"

// @ts-check
const { test, expect } = require('@playwright/test');
const devFeatureFlags = JSON.parse(JSON.stringify(require("../../fixtures/feature_flags_dev.json")));

test.beforeEach("Authentication", async ({ page, request }) => {
    await page.goto(process.env.DEV_BASE_URL);
    await generalCommands.loginAPI(page, request);
    await generalCommands.turnOnFeatureFlag(page, devFeatureFlags);
})

test('Check Membership billing frequency @membership @ui', async ({ page }) => {

    await managerPage.navigatToManagerScreen(page);
    await membershipPage.navigatToMembershipScreen(page);
    await page.locator("[name='add-membership']").click();await page.getByRole('textbox', { name: 'Name of membership' }).click();
    
    // Check month(s)
    await page.getByRole('textbox', { name: 'Name of membership' }).fill('Test membership');
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).click();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).fill('0');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Under minimum')).toBeVisible();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).fill('25');
    await expect(page.getByText('Over maximum')).toBeVisible();

    // Check year(s)
    await page.getByRole('button', { name: 'Select staff member Month(s)' }).click();
    await page.getByRole('option', { name: 'Year(s)' }).locator('div').first().click();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).click();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).fill('0');
    await expect(page.getByText('Under minimum')).toBeVisible();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).click();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).fill('3');
    await expect(page.getByText('Over maximum')).toBeVisible();

    // Check week(s)
    await page.getByRole('button', { name: 'Select staff member Year(s)' }).click();
    await page.getByRole('option', { name: 'Week(s)' }).locator('div').nth(1).click();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).click();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).fill('0');
    await expect(page.getByText('Under minimum')).toBeVisible();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).click();
    await page.getByRole('textbox', { name: 'Billing frequency Open number' }).fill('53');
    await expect(page.getByText('Over maximum')).toBeVisible();

});